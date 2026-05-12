import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private http = inject(HttpClient);
  private url  = 'http://localhost:8081/api/events';

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url);
  }

  create(event: Omit<Event, '_id' | 'createdAt'>): Observable<Event> {
    return this.http.post<Event>(this.url, event);
  }

  update(id: string, event: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.url}/${id}`, event);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}