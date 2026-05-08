import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    return true;
  }
 
  const returnUrl = route.url.map(s => s.path).join('/');
  router.navigate(['/acceso'], {
    queryParams: { returnUrl },
    replaceUrl: true,
  });
  return false;
};
