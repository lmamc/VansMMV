import { Routes } from '@angular/router';
import { authGuard } from '../Services/auth.guard';
// import { authGuard } from '../Services/auth.guard'; 

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home', 
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/Login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'detalles/:id',
    loadComponent: () => import('./views/Detalles/detalles.page').then( m => m.DetallesPage)
  },

  {
    path: 'views/Asientos/:viajeId',
    loadComponent: () => import('./views/Asientos/asientos.page').then(m => m.AsientosPage),
  canActivate: [authGuard]
  },
  // Ejemplo de cómo agrego el guard en el futuro
  
  // {
  //   path: 'mis-reservas',
  //   loadComponent: () => import('./views/mis-reservas/mis-reservas.page').then(m => m.MisReservasPage),
  //   canActivate: [authGuard] // El guard se usa para páginas que SÍ son privadas
  // },
];