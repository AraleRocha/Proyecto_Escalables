import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersService } from '../../services/volunteers-service';
import { VolunteerApplication } from '../../interfaces/volunteer-application';
import { ModalDelete } from "../modal-delete/modal-delete";

@Component({
  selector: 'app-panel-voluntarios',
  imports: [CommonModule, ModalDelete],
  templateUrl: './panel-voluntarios.html',
  styleUrl: './panel-voluntarios.css',
})
export class PanelVoluntarios implements OnInit {
  private volunteersService = inject(VolunteersService);

  applications = signal<VolunteerApplication[]>([]);
  deleteModalOpen = signal(false);
  deletingVolunteer = signal(false);
  volunteerToDelete = signal<string | null>(null);

  ngOnInit() {
    this.load();
  }

  load() {
    this.volunteersService.getAll().subscribe({
      next: (data) => {
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

  openDeleteModal(id: string) {
    this.volunteerToDelete.set(id);
    this.deleteModalOpen.set(true);
  }

  deleteVolunteer() {
    const id = this.volunteerToDelete();
    if (!id) return;

    this.deletingVolunteer.set(true);

    this.volunteersService.remove(id).subscribe({
      next: () => {
        this.load();
        this.deletingVolunteer.set(false);
        this.deleteModalOpen.set(false);
        this.volunteerToDelete.set(null);
      },
      error: (err) => {
        console.error('Error al eliminar voluntariado', err);
        this.deletingVolunteer.set(false);
      }
    });
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