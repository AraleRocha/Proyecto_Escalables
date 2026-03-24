import { Component, inject } from '@angular/core';
import { AdoptionsService } from '../../services/adoptions-service';
import { AdoptionTableComponent } from '../adoption-table-component/adoption-table-component';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-panel-solicitudes',
  imports: [CommonModule, AdoptionTableComponent],
  templateUrl: './panel-solicitudes.html',
  styleUrl: './panel-solicitudes.css',
})
export class PanelSolicitudes {
  private adoptionsService = inject(AdoptionsService);
 
  requests = this.adoptionsService.getAll.bind(this.adoptionsService);
 
  approve(id: string) { this.adoptionsService.updateStatus(id, 'aceptada'); }
  reject(id: string)  { this.adoptionsService.updateStatus(id, 'rechazada'); }
}
