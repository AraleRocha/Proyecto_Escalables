import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdoptionRequest } from '../interfaces/adoption-request';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class AdoptionsService {

  private http = inject(HttpClient);
  private url = `http://localhost:8081/api/adoptions`;
  private authService = inject(AuthService);

  private headers() {
    return new HttpHeaders({
      'Authorization': this.authService.getToken() ?? ''
    });
  }

  getAll(): Observable<AdoptionRequest[]> {
    return this.http.get<AdoptionRequest[]>(this.url,  { headers: this.headers() });
  }

  //Solo las solicitudes del usuario que este usando la pagina
  getByUser(userId: string): Observable<AdoptionRequest[]> {
    return this.http.get<AdoptionRequest[]>(`${this.url}/user/${userId}`);
  }

  updateStatus(id: string, status: 'aceptada' | 'rechazada'): Observable<AdoptionRequest> {
    return this.http.put<AdoptionRequest>(`${this.url}/${id}`, { status }, { headers: this.headers() });
  }

  create(request: Omit<AdoptionRequest, 'id' | 'createdAt'>): Observable<AdoptionRequest> {
    return this.http.post<AdoptionRequest>(this.url, request, { headers: this.headers() });
  }
}