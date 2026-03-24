import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

export type UserRole = 'adoptante' | 'refugio';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);

  isLoggedIn = computed(() => this.currentUser() !== null);
  user        = this.currentUser.asReadonly();
  isShelter   = computed(() => this.currentUser()?.role === 'refugio');

  constructor(private router: Router) {
    try {
      const stored = localStorage.getItem('pc_user');
      if (stored) this.currentUser.set(JSON.parse(stored));
    } catch {
      localStorage.removeItem('pc_user');
    }
  }

  login(email: string, password: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => { //simula usuario
        const mockUser: User = {
          id: 'user-demo',  
          name: 'Usuario Demo',
          email,
          role: 'adoptante',
        };
        this._setUser(mockUser);
        resolve();
      }, 800);
    });
  }

  register(name: string, email: string, _password: string, role: UserRole): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          role,
        };
        this._setUser(newUser);
        resolve();
      }, 800);
    });
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('pc_user');
    this.router.navigate(['/'], { replaceUrl: true });
  }

  private _setUser(user: User): void {
    this.currentUser.set(user);
    localStorage.setItem('pc_user', JSON.stringify(user));
  }
}