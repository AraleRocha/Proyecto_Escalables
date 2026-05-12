import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventsService } from '../../services/events-service';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-eventos',
  imports: [CommonModule, RouterLink],
  templateUrl: './eventos.html',
})
export class Eventos implements OnInit {
  private eventsService = inject(EventsService);

  events  = signal<Event[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.eventsService.getAll().subscribe({
      next: (data) => {
        this.events.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
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