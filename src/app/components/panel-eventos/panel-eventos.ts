import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../../services/events-service';
import { Event } from '../../interfaces/event';
import { ModalDelete } from "../modal-delete/modal-delete";

@Component({
  selector: 'app-panel-eventos',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalDelete
  ],
  templateUrl: './panel-eventos.html',
})
export class PanelEventos implements OnInit {

  private eventsService = inject(EventsService);
  private fb = inject(FormBuilder);

  events = signal<Event[]>([]);
  showForm = signal(false);
  isSubmitting = signal(false);

  editingId = signal<string | null>(null);

  deleteModalOpen = signal(false);
  deletingEvent = signal(false);
  eventToDelete = signal<string | null>(null);

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    date: ['', Validators.required],
    location: ['', Validators.required],
    imageUrl: [''],
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.eventsService.getAll().subscribe(data => {
      this.events.set(data);
    });
  }

  openCreate() {
    this.editingId.set(null);
    this.form.reset();
    this.showForm.set(true);
  }

  openEdit(event: Event) {
    this.editingId.set(event._id!);

    const d = new Date(event.date);

    const local = new Date(
      d.getTime() - d.getTimezoneOffset() * 60000
    ).toISOString().slice(0, 16);

    this.form.patchValue({
      ...event,
      date: local
    });

    this.showForm.set(true);
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting.set(true);

    const v = this.form.value;
    const id = this.editingId();

    const obs = id
      ? this.eventsService.update(id, v)
      : this.eventsService.create(v);

    obs.subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.showForm.set(false);
        this.form.reset();
        this.load();
      },
      error: () => {
        this.isSubmitting.set(false);
      },
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
        this.events.set(
          this.events().filter(event => event._id !== id)
        );

        this.deletingEvent.set(false);
        this.deleteModalOpen.set(false);
        this.eventToDelete.set(null);
      },
      error: (err) => {
        console.error(err);
        this.deletingEvent.set(false);
      }
    });
  }

  formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  }
}