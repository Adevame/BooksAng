import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import Book from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  books!: Book[];

  constructor(private bookService: BookService){ }

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
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id!== id);
    });
  }

}
