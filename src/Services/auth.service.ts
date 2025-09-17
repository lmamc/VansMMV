import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    const registrationPayload = {
      ...user,
      rol: { rol_id: 2 },
    };
    return this.http.post(`${this.apiUrl}/usuarios`, registrationPayload);
  }

  login(credentials: { username: string; contrasena: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, { responseType: 'text' }).pipe(
      tap(token => {
        localStorage.setItem(this.tokenKey, token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
