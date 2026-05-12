import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth-service';
import { Cat } from '../interfaces/cat';
import { Observable } from 'rxjs';

export type CatBehavior = 'tranquilo' | 'activo' | 'cariñoso' | 'independiente' | 'sociable';

export interface CatFilters {
  ageCategories: string[];
  gender: string | null;
  behaviors: CatBehavior[];
}

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private url = 'http://localhost:8081/api/cats';

  private headers(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': this.authService.getToken() ?? ''
    });
  }

  getAll(filters?: CatFilters): Observable<Cat[]> {
    const params: any = {};
    if (filters) {
      if (filters.ageCategories.length > 0) {
        params.ageCategories = filters.ageCategories;
      }
      if (filters.gender) {
        params.gender = filters.gender;
      }
      if (filters.behaviors.length > 0) {
        params.behaviors = filters.behaviors;
      }
    }
    return this.http.get<Cat[]>(this.url, { params });
  }

  getById(id: string): Observable<Cat> {
    return this.http.get<Cat>(`${this.url}/${id}`);
  }

  getFeatured(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.url);
  }

  create(data: Omit<Cat, 'id' | 'createdAt'>): Observable<Cat> {
    return this.http.post<Cat>(this.url, data, { headers: this.headers() });
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.headers() });
  }
}