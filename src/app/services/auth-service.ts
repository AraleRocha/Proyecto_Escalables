import { computed, Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'refugio' | 'adoptante';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private url = 'http://localhost:8081/api/auth';

  private _token = signal<string | null>(localStorage.getItem('token'));
  private _user  = signal<User | null>(JSON.parse(localStorage.getItem('user') ?? 'null'));

  isLoggedIn = computed(() => !!this._token());
  isAdmin  = computed(() => this._user()?.role === 'refugio');
  user = this._user.asReadonly();

  private headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.getToken() ?? '',
    });
  }

  getToken(): string | null {
    return this._token();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string; user: User }>(`${this.url}/login`, { email, password })
      .pipe(
        tap(res => {
          console.log('login:', res); 
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this._token.set(res.token);
          this._user.set(res.user);
        })
      );
  }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.url}/register`, { name, email, password, role });
  }

  updateUser(user: User): void {
  this._user.set(user);
  localStorage.setItem('user', JSON.stringify(user));
}

  update(id: string, data: { name?: string; email?: string; password?: string }): Observable<User> {
    return this.http.put<User>(`${this.url}/update/${id}`, data, {
      headers: this.headers(),
    }).pipe(
      tap(updated => this.updateUser(updated))
    );
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`, {
      headers: this.headers(),
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/acceso']);
  }
}