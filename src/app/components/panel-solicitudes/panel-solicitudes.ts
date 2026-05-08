import { Component, inject, signal, OnInit } from '@angular/core';
import { AdoptionsService } from '../../services/adoptions-service';
import { AdoptionTableComponent } from '../adoption-table-component/adoption-table-component';
import { CommonModule } from '@angular/common';
import { AdoptionRequest } from '../../interfaces/adoption-request';
 
@Component({
  selector: 'app-panel-solicitudes',
  imports: [CommonModule, AdoptionTableComponent],
  templateUrl: './panel-solicitudes.html',
  styleUrl: './panel-solicitudes.css',
})
export class PanelSolicitudes implements OnInit{
  private adoptionsService = inject(AdoptionsService);
 
  requests = signal<AdoptionRequest[]>([]);
 
  get stats() {
    const all = this.requests();
    return [
      { label: 'Pendientes', value: all.filter(r => r.status === 'pendiente').length, icon: 'pending_actions', subtitle: 'Sin revisar' },
      { label: 'Gatos en Refugio', value: 0, icon: 'pets', subtitle: 'Disponibles' },
      { label: 'Adopciones Mes',  value: all.filter(r => r.status === 'aceptada').length, icon: 'favorite', subtitle: 'Este mes' },
    ];
  }
 
  ngOnInit() {
    this.load();
  }
 
  load() {
    this.adoptionsService.getAll().subscribe(data => this.requests.set(data));
  }
 
  approve(id: string) {
    this.adoptionsService.updateStatus(id, 'aceptada').subscribe(() => this.load());
  }
 
  reject(id: string) {
    this.adoptionsService.updateStatus(id, 'rechazada').subscribe(() => this.load());
  }
}
