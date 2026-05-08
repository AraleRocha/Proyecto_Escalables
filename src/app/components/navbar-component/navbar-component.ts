import { Component, HostListener, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})

export class NavbarComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn;
  isAdmin = this.authService.isAdmin;
 
  navLinks = [
    { label: 'Inicio',       path: '/' },
    { label: 'Adoptar',      path: '/adoptar' },
    { label: 'Voluntariado', path: '/voluntariado' },
    { label: 'Donar',        path: '/donar' },
  ];
 
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  logout() {
    this.authService.logout();
  }
 
  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }
}
 