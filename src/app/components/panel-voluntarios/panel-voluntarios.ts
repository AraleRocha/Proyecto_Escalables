import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersService } from '../../services/volunteers-service';
@Component({
  selector: 'app-panel-voluntarios',
  imports: [CommonModule],
  templateUrl: './panel-voluntarios.html',
  styleUrl: './panel-voluntarios.css',
})
export class PanelVoluntarios {
  private volunteersService = inject(VolunteersService);
 
  statuses: Record<string, 'pendiente' | 'aceptado' | 'rechazado'> = {};
 
  get applications() {
    return this.volunteersService.getAll();
  }
 
  approve(id: string) { this.statuses[id] = 'aceptado'; }
  reject(id: string)  { this.statuses[id] = 'rechazado'; }
 
  getStatus(id: string): 'pendiente' | 'aceptado' | 'rechazado' {
    return this.statuses[id] ?? 'pendiente';
  }
 
  availabilityLabel(val: string): string {
    const map: Record<string, string> = {
      manana:          'Días de semana (Mañana)',
      tarde:           'Días de semana (Tarde)',
      fines_de_semana: 'Fines de semana',
    };
    return map[val] ?? val;
  }
}
