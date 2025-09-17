import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // El usuario está logueado, puede pasar
  } else {
    // El usuario no está logueado, redirigir a la página de login
    router.navigate(['/login']);
    return false;
  }
};