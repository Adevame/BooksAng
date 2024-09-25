import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import Book from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Author from '../../models/author.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  books!: Book[];
  author!: Author;

  constructor(private bookService: BookService, private router: Router){ }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data) => {
      console.log(data);
      this.books = data;
    })
  }

  trackByBookId(id: number, book: Book): number {
    return book.id;
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.id !== id);
        this.router.navigate([this.router.url]);
      },
      error: error => {
        console.error('failed to delete', error);
      }
    });
  }

  detailBook(id: number): void {
    this.router.navigate(['books', id]);
  }

  detailAuthor(book: Book): void {
    this.router.navigate(['authors', book.author.id]); 
  }

}
