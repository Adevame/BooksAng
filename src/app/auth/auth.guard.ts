import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  if (authService.isLoggedIn()) {
    if (authService.isAdmin(token))
    {
      return true;
    } else {
      alert('Not Admin');
      router.navigate(['']);
      return false;
    }
  }
  router.navigate(['/login']);
  return false;
};
