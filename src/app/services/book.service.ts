import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Book, { BookCreate, BookUpdate } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlApi = "https://127.0.0.1:8000/api/books";
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.urlApi}`)
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.urlApi}/${id}`)
  }


  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(`${this.urlApi}/${id}`)
  }

  detailBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.urlApi}/details/${id}`)
  }
  
  createBook(book: BookCreate): Observable<Book> {
    return this.http.post<Book>(this.urlApi, book)
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.urlApi}/${book.id}`, book)
  }
}
