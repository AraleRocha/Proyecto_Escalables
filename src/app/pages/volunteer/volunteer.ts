import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VolunteersService } from '../../services/volunteers-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-volunteer',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.css',
})
export class Volunteer implements OnInit {
  private fb = inject(FormBuilder);
  private volunteersService = inject(VolunteersService);
  public authService = inject(AuthService);

  isSubmitting = signal(false);
  submitSuccess = signal(false);
  alreadyApplied = signal(false);
  modalOpen = signal(false);
  modalMessage = signal('');
  modalError = signal(false);

  roles = [
    { icon: 'favorite', title: 'Cuidados Directos', description: 'Ayuda en la limpieza de refugios, alimentación y lo más importante: brindar amor y socialización a nuestros gatos.' },
    { icon: 'event', title: 'Eventos y Ferias', description: 'Asiste en jornadas de adopción, recaudación de fondos y eventos comunitarios para dar a conocer nuestra labor.' },
    { icon: 'local_shipping', title: 'Transporte Solidario', description: 'Traslado de gatitos a citas veterinarias o hacia sus nuevos hogares definitivos. Solo necesitas un vehículo y ganas de ayudar.' },
  ];

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    disponibilidad: ['manana', Validators.required],
    mensaje: [''],
  });

  ngOnInit() {
    const user = this.authService.user();
    if (user) {
      this.form.patchValue({ nombre: user.name, email: user.email });
      this.form.get('nombre')?.disable();
      this.form.get('email')?.disable();

      this.volunteersService.getAll().subscribe({
        next: (all) => {
          this.alreadyApplied.set(all.some(v => v.email === user.email));
        }
      });
    }
  }

  onSubmit() {
    if (!this.authService.isLoggedIn()) {
      this.modalMessage.set('Debes iniciar sesión para continuar');
      this.modalError.set(true);
      this.modalOpen.set(true);
      return;
    }

    if (this.alreadyApplied()) {
      this.modalMessage.set('Ya enviaste una solicitud de voluntariado');
      this.modalError.set(true);
      this.modalOpen.set(true);
      return;
    }

    if (this.form.invalid) return;

    this.isSubmitting.set(true);
    const v = this.form.getRawValue();

    this.volunteersService.submit({
      fullName: v.nombre,
      email: v.email,
      availability: v.disponibilidad,
      message: v.mensaje,
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.alreadyApplied.set(true);
        this.form.reset();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.modalMessage.set(err?.error?.error || 'Error al enviar la solicitud');
        this.modalError.set(true);
        this.modalOpen.set(true);
      }
    });
  }
}