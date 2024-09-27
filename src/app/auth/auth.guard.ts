import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  let isAdmin = false;

  if (authService.isLoggedIn()) {
    if (authService.isLoggedIn() && authService.isAdmin(token) === true)
    {
      console.log('good');
      isAdmin = true;
    } else {
      console.log('not good');
    }
    console.log(isAdmin);
    
    return true;
  }

  router.navigate(['/login']);
  return false;
};
