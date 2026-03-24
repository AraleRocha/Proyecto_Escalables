import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'adoptar',
    loadComponent: () =>
      import('./pages/catalog/catalog').then(m => m.Catalog),
  },
  {
    path: 'adoptar/:id',
    loadComponent: () =>
      import('./pages/cat-detail/cat-detail').then(m => m.CatDetail),
  },
  {
    path: 'voluntariado',
    loadComponent: () =>
      import('./pages/volunteer/volunteer').then(m => m.Volunteer),
  },
  {
    path: 'donar',
    loadComponent: () =>
      import('./pages/donations/donations').then(m => m.Donations),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login),
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./components/perfil-component/perfil-component').then(m => m.PerfilComponent),
  },
  {
    path: 'panel',
    loadComponent: () =>
      import('./pages/admin-panel/admin-panel').then(m => m.AdminPanel),
  },
  { path: '**', redirectTo: '' },
];
