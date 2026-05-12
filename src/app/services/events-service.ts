import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth-service';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private url = 'http://localhost:8081/api/events';

  private headers(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': this.authService.getToken() ?? ''
    });
  }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url);
  }

  create(event: Omit<Event, '_id' | 'createdAt'>): Observable<Event> {
    return this.http.post<Event>(this.url, event, { headers: this.headers() });
  }

  update(id: string, event: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.url}/${id}`, event, { headers: this.headers() });
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.headers() });
  }
}