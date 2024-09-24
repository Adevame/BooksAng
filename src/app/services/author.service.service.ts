import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Author from '../models/author.model';

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
  
}
