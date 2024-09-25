import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from '../../books/books.component';
import Book, { BookUpdate } from '../../../models/book.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../../services/author.service.service';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [BooksComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})

export class UpdateBookComponent implements OnInit {
  book!: Book;
  updateBookForm: FormGroup;
  submitted = false;
  message = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router) {
      this.updateBookForm = this.fb.group({
        title: ['', [Validators.minLength(3)]],
        coverText: ['', [Validators.minLength(10)]],
        comment: ['', [Validators.minLength(10)]],
        authorId: [''],
      });
    }
  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id')
    if (bookId) {
      this.bookService.getBook(+bookId).subscribe({
        next: (book) => {
          this.book = book;
          this.updateBookForm.patchValue({
            title: book.title,
            coverText: book.coverText,
            comment: book.comment,
            authorId: book.author.id,
          });
        },
        error: (error) => {
          console.error(error);
          alert('Livre non trouvé');
        }
      });
    }
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.updateBookForm.valid) {
      const authorId = this.updateBookForm.get('authorId')?.value;

      this.authorService.getAuthor(authorId).subscribe({
        next: (author) => {
          const bookData: BookUpdate = {
            title: this.updateBookForm.get('title')?.value || this.book.title,
            coverText: this.updateBookForm.get('coverText')?.value || this.book.coverText,
            comment: this.updateBookForm.get('comment')?.value || this.book.comment,
            author: author || this.book.author,
          };
          const updatedBook = { ...bookData, id: this.book.id };
          this.bookService.createBook(updatedBook).subscribe({
            next: () => {
              this.message = true;
              this.updateBookForm.reset();
              alert('Livre mis à jour');
              this.router.navigate(['books']);
            },
            error: (err) => {
              alert('Echec de mise à jour du livre');
            }
          });
        },
        error: (err) => {
          alert('Echec de récupèration des informations de l\'auteur');
        }
      });
    }
  }       
}
