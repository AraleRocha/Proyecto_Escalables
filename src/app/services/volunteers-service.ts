import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VolunteerApplication } from '../interfaces/volunteer-application';
import { AuthService } from './auth-service';

export type VolunteerWithId = VolunteerApplication & { id: string; status: string; createdAt: Date };

@Injectable({
  providedIn: 'root',
})
export class VolunteersService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private url = 'http://localhost:8081/api/volunteers';

  private headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.authService.getToken() ?? '',
    });
  }

  getAll(): Observable<VolunteerWithId[]> {
    return this.http.get<VolunteerWithId[]>(this.url, { headers: this.headers() });
  }

  submit(application: VolunteerApplication): Observable<VolunteerWithId> {
    return this.http.post<VolunteerWithId>(this.url, application, { headers: this.headers() });
  }

  updateStatus(id: string, status: 'aceptado' | 'rechazado'): Observable<VolunteerWithId> {
    return this.http.put<VolunteerWithId>(`${this.url}/${id}`, { status }, { headers: this.headers() });
  }
}