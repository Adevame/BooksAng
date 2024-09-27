import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  console.log('Interceptor to:', req.url);
  
  const token = authService.getToken();
  console.log('Token', token);
  
  if (token) {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`, 
      },
    });
  } else {
    console.log('No token found, please log in');
  }
  
  return next(req);
};
