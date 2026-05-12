import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

export interface DonationRecord {
  _id?: string;
  amount: number;
  cardLast4?: string;
  userId?: string | {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class DonationsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private url  = 'http://localhost:8081/api/donations';

  private headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.authService.getToken() ?? '',
    });
  }

  create(data: { amount: number; cardNumber: string; userId?: string }): Observable<DonationRecord> {
    return this.http.post<DonationRecord>(this.url, data);
  }

  getAll(): Observable<DonationRecord[]> {
    return this.http.get<DonationRecord[]>(this.url, { headers: this.headers() });
  }

  getByUser(userId: string): Observable<DonationRecord[]> {
    return this.http.get<DonationRecord[]>(`${this.url}/user/${userId}`, {
      headers: this.headers(),
    });
  }
}