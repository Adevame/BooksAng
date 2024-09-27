import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private httpClient = inject(HttpClient);
  private urlApi = "https://localhost:8000/api";

  signup(data: any) {
    return this.httpClient.post(`${this.urlApi}/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${this.urlApi}/login`, data).pipe(tap((res: any) => {
      console.log('Login response:', res);     
      localStorage.setItem('authUser', JSON.stringify(res));
    }));
  }

  logout() {
    return localStorage.removeItem('authUser');
  }

  isLoggedIn() { 
    return localStorage.getItem('authUser') !== null;
  }

  getToken() {
    const authUser = localStorage.getItem('authUser');

    if (authUser) {
      try {
        const parsedUser = JSON.parse(authUser);
        console.log('ParsedUser:', parsedUser);        
        return parsedUser?.token || null;
      } catch (err) {
        console.error('Invalid authUser data', err);
        return null;
      }
    }
    console.log('No authUser found');
    return null;
  }
}
