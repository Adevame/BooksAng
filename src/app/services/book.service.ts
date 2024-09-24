import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Book from '../models/book.model';

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
    alert("Book deleted")
    return this.http.delete<Book>(`${this.urlApi}/${id}`)
  }
}
