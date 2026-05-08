import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AdoptionsService } from '../../services/adoptions-service';
import { AdoptionRequest } from '../../interfaces/adoption-request';
import { AuthService } from '../../services/auth-service';
type PerfilTab = 'info' | 'solicitudes';

@Component({
  selector: 'app-perfil-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil-component.html',
  styleUrl: './perfil-component.css',
})

export class PerfilComponent implements OnInit {
  private adoptionsService = inject(AdoptionsService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
 
  activeTab = signal<PerfilTab>('info');
 
  tabs: { id: PerfilTab; label: string }[] = [
    { id: 'info', label: 'Mi Perfil' },
    { id: 'solicitudes', label: 'Mis Solicitudes' },
  ];
  
  user = this.authService.user;
  solicitudes = signal<AdoptionRequest[]>([]);
 
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'solicitudes') this.activeTab.set('solicitudes');
    });

    // Cargar solicitudes
    this.adoptionsService.getAll().subscribe(data => {
      this.solicitudes.set(data);
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