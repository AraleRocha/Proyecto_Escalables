import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdoptionsService } from '../../services/adoptions-service';
import { AdoptionRequest } from '../../interfaces/adoption-request';
import { AuthService } from '../../services/auth-service';
import { VolunteerApplication } from '../../interfaces/volunteer-application';
import { VolunteersService } from '../../services/volunteers-service';
import { DonationsService, DonationRecord } from '../../services/donations-service';

type PerfilTab = 'info' | 'solicitudes' | 'voluntariado' | 'donaciones';

@Component({
  selector: 'app-perfil-component',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './perfil-component.html',
  styleUrl: './perfil-component.css',
})
export class PerfilComponent implements OnInit {
  private adoptionsService = inject(AdoptionsService);
  private volunteersService = inject(VolunteersService);
  private donationsService = inject(DonationsService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  isShelter = computed(() => this.user()?.role === 'refugio');

  activeTab = signal<PerfilTab>('info');

  tabs = computed<{ id: PerfilTab; label: string }[]>(() => {
    const base: { id: PerfilTab; label: string }[] = [
      { id: 'info', label: 'Mi Perfil' },
      { id: 'donaciones', label: 'Donaciones' }
    ];

    if (!this.isShelter()) {
      base.push(
        { id: 'solicitudes', label: 'Mis Solicitudes' },
        { id: 'voluntariado', label: 'Voluntariado' }
      );
    }

    return base;
  });

  deleteModalOpen = signal(false);
  deletingAccount = signal(false);

  user          = this.authService.user;
  solicitudes   = signal<AdoptionRequest[]>([]);
  voluntariados = signal<VolunteerApplication[]>([]);
  donaciones    = signal<DonationRecord[]>([]);
  isEditing     = signal(false);
  isSaving      = signal(false);

  editForm: FormGroup = this.fb.group({
    name:     ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', Validators.minLength(6)],
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) this.activeTab.set(params['tab'] as PerfilTab);
    });

    const u = this.authService.user();
    if (!u) return;

    this.editForm.patchValue({ name: u.name, email: u.email });

    this.adoptionsService.getAll().subscribe(data =>
      this.solicitudes.set(data.filter(s => s.applicantId === u._id))
    );

    this.volunteersService.getAll().subscribe(data =>
      this.voluntariados.set(data.filter(v => v.email === u.email))
    );

    this.donationsService.getByUser(u._id!).subscribe(data =>
      this.donaciones.set(data)
    );
  }

  saveProfile() {
    if (this.editForm.invalid) return;
    this.isSaving.set(true);

    const u = this.authService.user();
    const v = this.editForm.value;
    const body: any = { name: v.name, email: v.email };
    if (v.password) body.password = v.password;

    this.authService.update(u!._id!, body).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isEditing.set(false);
      },
      error: () => this.isSaving.set(false),
    });
  }

  deleteAccount() {
  const u = this.authService.user();
  if (!u) return;

  this.deletingAccount.set(true);

  this.authService.remove(u._id!).subscribe({
    next: () => {
      this.deletingAccount.set(false);
      this.deleteModalOpen.set(false);
      this.authService.logout();
    },
    error: () => {
      this.deletingAccount.set(false);
    }
  });
}

  statusLabel: Record<AdoptionRequest['status'], string> = {
    pendiente: 'En revisión',
    aceptada:  'Aceptada',
    rechazada: 'Rechazada',
  };

  voluntarioStatusLabel: Record<string, string> = {
    pendiente: 'En revisión',
    aceptado:  'Aceptado',
    rechazado: 'Rechazado',
  };

  availabilityLabel(val: string | undefined): string {
    const map: Record<string, string> = {
      manana: 'Días de semana (Mañana)',
      tarde: 'Días de semana (Tarde)',
      fines_de_semana: 'Fines de semana',
    };
    return map[val ?? ''] ?? val ?? '';
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit', month: 'long', year: 'numeric',
    }).format(new Date(date));
  }
}