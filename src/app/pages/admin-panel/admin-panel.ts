import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PanelSolicitudes } from '../../components/panel-solicitudes/panel-solicitudes';
import { PanelVoluntarios } from '../../components/panel-voluntarios/panel-voluntarios';
import { PanelDonativos } from '../../components/panel-donativos/panel-donativos';
import { PanelGatos } from '../../components/panel-gatos/panel-gatos';
import { PanelEventos } from "../../components/panel-eventos/panel-eventos";
 
type PanelTab = 'solicitudes' | 'voluntarios' | 'gatos' | 'donativos' | 'eventos';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, PanelSolicitudes, PanelVoluntarios, PanelGatos, PanelDonativos, PanelEventos],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel {
  activeTab = signal<PanelTab>('solicitudes');
 
  tabs: { id: PanelTab; label: string; icon: string }[] = [
    { id: 'solicitudes', label: 'Solicitudes', icon: 'assignment' },
    { id: 'voluntarios', label: 'Voluntarios', icon: 'group' },
    { id: 'gatos', label: 'Gatos', icon: 'pets' },
    { id: 'donativos', label: 'Donativos',icon: 'volunteer_activism' },
    { id: 'eventos', label: 'Eventos', icon: 'volunteer_activism' },
  ];
}
