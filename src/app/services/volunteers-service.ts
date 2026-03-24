import { Injectable, signal } from '@angular/core';
import { VolunteerApplication } from '../interfaces/volunteer-application';

@Injectable({
  providedIn: 'root',
})
export class VolunteersService {
  private applications = signal<(VolunteerApplication & { id: string; createdAt: Date })[]>([
    {
      id: '1',
      fullName: 'Ana García López',
      email: 'ana.garcia@correo.com',
      availability: 'fines_de_semana',
      message: 'Me encanta los animales y tengo experiencia cuidando gatos rescatados en mi colonia.',
      createdAt: new Date('2024-10-15'),
    },
  ]);

  getAll() {
    return this.applications();
  }

  submit(application: VolunteerApplication): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.applications.update(list => [
          ...list,
          { ...application, id: Date.now().toString(), createdAt: new Date() },
        ]);
        resolve();
      }, 1000);
    });
  }
}