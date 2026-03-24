import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-est-card-component',
  imports: [],
  templateUrl: './est-card-component.html',
  styleUrl: './est-card-component.css',
})
export class EstCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: number | string;
  @Input({ required: true }) icon!: string;
  @Input() subtitle?: string;
}
