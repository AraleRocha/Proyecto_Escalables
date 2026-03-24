import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AdoptionsService } from '../../services/adoptions-service';
import { AdoptionRequest } from '../../interfaces/adoption-request';
 
type PerfilTab = 'info' | 'solicitudes';

@Component({
  selector: 'app-perfil-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil-component.html',
  styleUrl: './perfil-component.css',
})

export class PerfilComponent implements OnInit {
  private adoptionsService = inject(AdoptionsService);
  private route            = inject(ActivatedRoute);
 
  activeTab = signal<PerfilTab>('info');
 
  tabs: { id: PerfilTab; label: string }[] = [
    { id: 'info',        label: 'Mi Perfil' },
    { id: 'solicitudes', label: 'Mis Solicitudes' },
  ];
 
  userName  = 'Usuario Demo';
  userEmail = 'usuario@correo.com';
  userRole  = 'Adoptante';
 
  solicitudes = computed<AdoptionRequest[]>(() =>
    this.adoptionsService.getByUser('usuario')
  );
 
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'solicitudes') this.activeTab.set('solicitudes');
    });
  }
 
  statusLabel: Record<AdoptionRequest['status'], string> = {
    pendiente: 'En revisión',
    aceptada:  'Aceptada',
    rechazada: 'Rechazada',
  };
 
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit', month: 'long', year: 'numeric'
    }).format(new Date(date));
  }
}