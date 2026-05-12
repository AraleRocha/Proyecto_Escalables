import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events-service';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-eventos',
  imports: [CommonModule],
  templateUrl: './eventos.html',
})
export class Eventos implements OnInit {
  private eventsService = inject(EventsService);

  events = signal<Event[]>([]);
  loading = signal(true);

  deleteModalOpen = signal(false);
  deletingEvent = signal(false);
  eventToDelete = signal<string | null>(null);

  ngOnInit() {
    this.eventsService.getAll().subscribe({
      next: (data) => {
        this.events.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  openDeleteModal(id: string) {
    this.eventToDelete.set(id);
    this.deleteModalOpen.set(true);
  }

  deleteEvent() {
    const id = this.eventToDelete();
    if (!id) return;

    this.deletingEvent.set(true);

    this.eventsService.remove(id).subscribe({
      next: () => {
        this.events.set(this.events().filter(event => event._id !== id));
        this.deletingEvent.set(false);
        this.deleteModalOpen.set(false);
        this.eventToDelete.set(null);
      },
      error: (err) => {
        console.error('Error al eliminar evento', err);
        this.deletingEvent.set(false);
      }
    });
  }

  formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat('es-MX', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    }).format(new Date(date));
  }

  formatTime(date: Date | string): string {
    return new Intl.DateTimeFormat('es-MX', {
      hour: '2-digit', minute: '2-digit',
    }).format(new Date(date));
  }
}