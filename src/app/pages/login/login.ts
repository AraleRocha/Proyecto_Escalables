import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

export type UserRole = 'adoptante' | 'refugio';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login  implements OnInit{
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  mode = signal<'login' | 'register'>('login');
  selectedRole = signal<UserRole>('adoptante');
  isSubmitting = signal(false);
  errorMessage = signal('');

  loginForm: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registerForm: FormGroup = this.fb.group({
    name:     ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  roles: { value: UserRole; label: string; icon: string }[] = [ //Esto se cambiara para la base de datos
    { value: 'adoptante',  label: 'Adoptante',  icon: 'person' },
    { value: 'refugio',    label: 'Refugio',    icon: 'home_health' },
  ];

  ngOnInit() {
    const queryMode = this.route.snapshot.queryParamMap.get('mode');
    if (queryMode === 'register') this.mode.set('register');
  }

  setMode(m: 'login' | 'register') { this.mode.set(m); this.errorMessage.set(''); }

  onLogin() {
    if (this.loginForm.invalid) return;
    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.auth.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        // Si era refugio va al panel, si era adoptante va al inicio
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigate([returnUrl]);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Credenciales incorrectas. Intenta de nuevo.');
      }
    });
  }

  onRegister() {
    if (this.registerForm.invalid) return;
    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const { name, email, password } = this.registerForm.value;

    this.auth.register(name, email, password, this.selectedRole()).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        // Después de registrar, ir al login
        this.setMode('login');
        this.errorMessage.set(''); // limpiar
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(
          err.error?.msg || 'Error al crear la cuenta. Intenta de nuevo.'
        );
      }
    });
  }
}
