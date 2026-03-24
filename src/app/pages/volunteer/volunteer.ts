import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-volunteer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.css',
})
export class Volunteer {
  form: FormGroup;
  isSubmitting = signal(false);
  submitSuccess = signal(false);

  roles = [
    {
      icon: 'favorite',
      title: 'Cuidados Directos',
      description: 'Ayuda en la limpieza de refugios, alimentación y lo más importante: brindar amor y socialización a nuestros gatos.',
    },
    {
      icon: 'event',
      title: 'Eventos y Ferias',
      description: 'Asiste en jornadas de adopción, recaudación de fondos y eventos comunitarios para dar a conocer nuestra labor.',
    },
    {
      icon: 'local_shipping',
      title: 'Transporte Solidario',
      description: 'Traslado de gatitos a citas veterinarias o hacia sus nuevos hogares definitivos. Solo necesitas un vehículo y ganas de ayudar.',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre:         ['', [Validators.required, Validators.minLength(3)]],
      email:          ['', [Validators.required, Validators.email]],
      disponibilidad: ['manana', Validators.required],
      mensaje:        [''],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting.set(true);
    await new Promise(r => setTimeout(r, 1000));
    this.isSubmitting.set(false);
    this.submitSuccess.set(true);
    this.form.reset();
  }
}
