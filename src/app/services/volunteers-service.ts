import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VolunteerApplication } from '../interfaces/volunteer-application';

export type VolunteerWithId = VolunteerApplication & { id: string; status: string; createdAt: Date };

@Injectable({
  providedIn: 'root',
})
export class VolunteersService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8081/api/volunteers';

  getAll(): Observable<VolunteerWithId[]> {
    return this.http.get<VolunteerWithId[]>(this.url);
  }
 
  submit(application: VolunteerApplication): Observable<VolunteerWithId> {
    return this.http.post<VolunteerWithId>(this.url, application);
  }
 
  updateStatus(id: string, status: 'aceptado' | 'rechazado'): Observable<VolunteerWithId> {
    return this.http.put<VolunteerWithId>(`${this.url}/${id}`, { status });
  }
}