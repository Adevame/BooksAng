import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import Book from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import Author from '../../models/author.model';
import { AuthService } from '../../auth/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterOutlet],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  books!: Book[];
  author!: Author;
  p: number = 1;
  total: number = 0;
  itemsPerPage: number = 6;
  private authService = inject(AuthService);

  constructor(private bookService: BookService, private router: Router){ }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
      this.total = data.length;
    })
  }

  trackByBookId(id: number, book: Book): number {
    return book.id;
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.id !== id);
        this.total = this.books.length;
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

  updateBook(id: number): void {
    this.router.navigate(['updateBook', id]);
  }

  isHidden (): boolean {
    const token = this.authService.getToken();
    if(this.authService.isAdmin(JSON.stringify(token))){
      return true;
    } else {
      return false;
    }
  }

}
