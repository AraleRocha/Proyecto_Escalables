import { Component, inject, signal, OnInit } from '@angular/core';
import { AdoptionsService } from '../../services/adoptions-service';
import { AdoptionTableComponent } from '../adoption-table-component/adoption-table-component';
import { CommonModule } from '@angular/common';
import { AdoptionRequest } from '../../interfaces/adoption-request';
import { ModalDelete } from "../modal-delete/modal-delete";

@Component({
  selector: 'app-panel-solicitudes',
  imports: [CommonModule, AdoptionTableComponent, ModalDelete],
  templateUrl: './panel-solicitudes.html',
  styleUrl: './panel-solicitudes.css',
})
export class PanelSolicitudes implements OnInit {
  private adoptionsService = inject(AdoptionsService);

  requests = signal<AdoptionRequest[]>([]);
  deleteModalOpen = signal(false);
  deletingRequest = signal(false);
  requestToDelete = signal<string | null>(null);

  get stats() {
    const all = this.requests();
    return [
      { label: 'Pendientes', value: all.filter(r => r.status === 'pendiente').length, icon: 'pending_actions', subtitle: 'Sin revisar' },
      { label: 'Gatos en Refugio', value: 0, icon: 'pets', subtitle: 'Disponibles' },
      { label: 'Adopciones Mes', value: all.filter(r => r.status === 'aceptada').length, icon: 'favorite', subtitle: 'Este mes' },
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

  openDeleteModal(id: string) {
    this.requestToDelete.set(id);
    this.deleteModalOpen.set(true);
  }

  deleteRequest() {
    const id = this.requestToDelete();
    if (!id) return;

    this.deletingRequest.set(true);

    this.adoptionsService.remove(id).subscribe({
      next: () => {
        this.load();
        this.deletingRequest.set(false);
        this.deleteModalOpen.set(false);
        this.requestToDelete.set(null);
      },
      error: (err) => {
        console.error('Error al eliminar solicitud', err);
        this.deletingRequest.set(false);
      }
    });
  }
}