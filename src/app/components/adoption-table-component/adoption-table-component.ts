import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdoptionRequest } from '../../interfaces/adoption-request';

@Component({
  selector: 'app-adoption-table-component',
  imports: [CommonModule],
  templateUrl: './adoption-table-component.html',
  styleUrl: './adoption-table-component.css',
})
export class AdoptionTableComponent {
  @Input({ required: true }) requests: AdoptionRequest[] = [];
  @Output() approve = new EventEmitter<string>();
  @Output() reject  = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
}
