import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersService, VolunteerWithId } from '../../services/volunteers-service';
import { VolunteerApplication } from '../../interfaces/volunteer-application';
@Component({
  selector: 'app-panel-voluntarios',
  imports: [CommonModule],
  templateUrl: './panel-voluntarios.html',
  styleUrl: './panel-voluntarios.css',
})
export class PanelVoluntarios implements OnInit {
  private volunteersService = inject(VolunteersService);
 
  applications = signal<VolunteerApplication[]>([]);
 
  ngOnInit() {
    this.load();
  }
 
  load() {
    this.volunteersService.getAll().subscribe({
      next: (data) => {
        console.log('Voluntarios:', data);  
        this.applications.set(data);
      },
      error: (err) => console.error('Error:', err)
    });
  }
 
  approve(id: string) {
    this.volunteersService.updateStatus(id, 'aceptado').subscribe(() => this.load());
  }
 
  reject(id: string) {
    this.volunteersService.updateStatus(id, 'rechazado').subscribe(() => this.load());
  }
 
  getStatus(app: VolunteerApplication): string {
    return app.status ?? 'pendiente';
  }
 
  availabilityLabel(val: string): string {
    const map: Record<string, string> = {
      manana: 'Días de semana (Mañana)',
      tarde: 'Días de semana (Tarde)',
      fines_de_semana: 'Fines de semana',
      ocasional: 'Eventos ocasionales',
    };
    return map[val] ?? val;
  }
}
