import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from '../../books/books.component';
import Book, { BookCreate } from '../../../models/book.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import { AuthorService } from '../../../services/author.service.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [BooksComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})

export class AddBookComponent {
  book!: Book;
  createBookForm: FormGroup;
  submitted = false;
  message = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router,
  ) {
    this.createBookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      coverText: ['', [Validators.required, Validators.minLength(10)]],
      comment: ['', [Validators.required, Validators.minLength(10)]],
      authorId: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.createBookForm.valid) {
      const authorId = this.createBookForm.get('authorId')?.value;

      this.authorService.getAuthor(authorId).subscribe({
        next: (author) => {
          const bookData: BookCreate = {
            title: this.createBookForm.get('title')?.value,
            coverText: this.createBookForm.get('coverText')?.value,
            comment: this.createBookForm.get('comment')?.value,
            author: author,
          };
          this.bookService.createBook(bookData).subscribe({
            next: () => {
              this.message = true;
              this.createBookForm.reset();
              alert('Livre créé');
              this.router.navigate(['books']);
            },
            error: () => {
              alert('Echec de création du livre');
            }
          });
        },
        error: () => {
          alert('Echec de récupèration des informations de l\'auteur');
        }
      });
    }
  }

  public get title(): string {
    return this.createBookForm.get('title')?.value;
  }

  public get coverText(): string {
    return this.createBookForm.get('coverText')?.value;
  }

  public get comment(): string {
    return this.createBookForm.get('comment')?.value;
  }
}
