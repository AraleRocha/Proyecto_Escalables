import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DonationsService } from '../../services/donations-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-donations',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './donations.html',
  styleUrl: './donations.css',
})
export class Donations {
  private donationsService = inject(DonationsService);
  private authService = inject(AuthService);
  form: FormGroup;
  isSubmitting = signal(false);
  submitSuccess = signal(false);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      monto: [null, [Validators.required, Validators.min(1)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const user = this.authService.user();
    if (!user) return;

    this.isSubmitting.set(true);

    const v = this.form.value;

    this.donationsService.create({
      amount: v.monto,
      cardNumber: v.cardNumber,
      userId: user._id,
    }).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.form.reset();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        console.error('Error al donar:', err);
      }
    });
  }
}