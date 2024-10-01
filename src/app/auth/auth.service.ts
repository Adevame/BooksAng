import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private httpClient = inject(HttpClient);
  private urlApi = "https://localhost:8000/api";

  public signup(data: any) {
    return this.httpClient.post(`${this.urlApi}/register`, data).pipe(tap((res: any) => {
      const token = res.token;
      localStorage.setItem('authUser', JSON.stringify(res));
    }));
  }

  public login(data: any) {
    return this.httpClient.post(`${this.urlApi}/login`, data).pipe(tap((res: any) => {
      localStorage.setItem('authUser', JSON.stringify(res));
    }));
  }

  public logout() {
    return localStorage.clear();
  }

  public isLoggedIn() { 
    return localStorage.getItem('authUser') !== null;
  }

  public getToken() {
    const authUser = localStorage.getItem('authUser');

    if (authUser) {
      try {
        const parsedUser = JSON.parse(authUser);
        return parsedUser?.token || null;
      } catch (err) {
        console.error('Invalid authUser data', err);
        return null;
      }
    }
    return null;
  }

  /**Rajouter vérif admin pour les routes*/

  public isAdmin(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.roles && decodedToken.roles.includes('ROLE_ADMIN');
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }
}