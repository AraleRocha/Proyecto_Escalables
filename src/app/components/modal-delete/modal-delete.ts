import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-delete.html',
  styleUrl: './modal-delete.css',
})
export class ModalDelete {
  @Input() open = false;
  @Input() title = '¿Eliminar elemento?';
  @Input() message = 'Esta acción no se puede deshacer.';
  @Input() confirmText = 'Sí, eliminar';
  @Input() cancelText = 'Cancelar';
  @Input() loading = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
