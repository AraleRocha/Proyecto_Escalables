import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationsService, Donation } from '../../services/donations-service';

@Component({
  selector: 'app-panel-donativos',
  imports: [CommonModule],
  templateUrl: './panel-donativos.html',
  styleUrl: './panel-donativos.css',
})
export class PanelDonativos implements OnInit {

  private donationsService = inject(DonationsService);

  donaciones = signal<Donation[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadDonaciones();
  }

  loadDonaciones() {
    this.loading.set(true);

    this.donationsService.getAll().subscribe({
      next: (data) => {
        this.donaciones.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar donaciones', err);
        this.loading.set(false);
      }
    });
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';

    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  }

  getUserName(userId: Donation['userId']): string {
    if (typeof userId === 'object' && userId) {
      return userId.name;
    }

    return '';
  }

  getUserEmail(userId: Donation['userId']): string {
    if (typeof userId === 'object' && userId) {
      return userId.email;
    }

    return '';
  }
}