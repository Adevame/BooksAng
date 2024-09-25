import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Author, { AuthorCreate } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private urlApi = "https://localhost:8000/api/authors";
  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.urlApi}`)
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.urlApi}/${id}`)
  }
  
  deleteAuthor(id: number): Observable<Author> {
    return this.http.delete<Author>(`${this.urlApi}/${id}`)
  }

  createAuthor(author: AuthorCreate): Observable<Author> {
    return this.http.post<Author>(this.urlApi, author)
  }

  updateAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.urlApi}/${author.id}`, author)
  }
}
