import { Injectable, signal } from '@angular/core';
import { AdoptionRequest } from '../interfaces/adoption-request';

@Injectable({ providedIn: 'root' })
export class AdoptionsService {

  private requests = signal<AdoptionRequest[]>([
    {
      id: '1',
      catId: '1',
      catName: 'Nieve',
      catPhoto: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
      applicantId: 'user-demo',
      applicantName: 'María Alarcón',
      applicantEmail: 'maria@correo.com',
      status: 'pendiente',
      createdAt: new Date('2024-10-12'),
    },
    {
      id: '2',
      catId: '3',
      catName: 'Simba',
      catPhoto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
      applicantId: 'user-demo',
      applicantName: 'Roberto Gómez',
      applicantEmail: 'roberto.g@email.com',
      status: 'aceptada',
      createdAt: new Date('2024-10-11'),
    },
    {
      id: '3',
      catId: '2',
      catName: 'Luna',
      catPhoto: 'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=400',
      applicantId: 'other-user',
      applicantName: 'Lucía Castro',
      applicantEmail: 'lu_castro@web.com',
      status: 'rechazada',
      createdAt: new Date('2024-10-10'),
    },
  ]);

  getAll(): AdoptionRequest[] {
    return this.requests();
  }

  //Solo las solicitudes del usuario que este usando la pagina
  getByUser(userId: string): AdoptionRequest[] {
    return this.requests().filter(r => r.applicantId === userId);
  }

  updateStatus(id: string, status: 'aceptada' | 'rechazada'): void {
    this.requests.update(list =>
      list.map(r => r.id === id ? { ...r, status } : r)
    );
  }

  create(request: Omit<AdoptionRequest, 'id' | 'createdAt'>): void {
    const newRequest: AdoptionRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    this.requests.update(list => [...list, newRequest]);
  }
}