import { Component, inject,signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VolunteersService } from '../../services/volunteers-service';  
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-volunteer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.css',
})
export class Volunteer {
  private fb = inject(FormBuilder);
  private volunteersService = inject(VolunteersService);
  public authService = inject(AuthService);

  isSubmitting = signal(false);
  submitSuccess = signal(false);

  ngOnInit() {
    const user = this.authService.user();
    if (user) {
      this.form.patchValue({
        nombre: user.name,
        email:  user.email,
      });
      this.form.get('nombre')?.disable();
      this.form.get('email')?.disable();
    }
  }

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

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    disponibilidad: ['manana', Validators.required],
    mensaje: [''],
  });

  onSubmit() {
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
        this.form.reset();
      },
      error: () => {
        this.isSubmitting.set(false);
      }
    });
  }
}
