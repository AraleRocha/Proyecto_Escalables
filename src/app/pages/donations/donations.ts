import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donations',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './donations.html',
  styleUrl: './donations.css',
})
export class Donations {
  form: FormGroup;
  isSubmitting = signal(false);
  submitSuccess = signal(false);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      monto:       [null, [Validators.required, Validators.min(1)]],
      cardNumber:  ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry:      ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv:         ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting.set(true);
    await new Promise(r => setTimeout(r, 1200));
    this.isSubmitting.set(false);
    this.submitSuccess.set(true);
  }
}
