import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGaurd: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const token = sessionStorage.getItem('token');

  if(token && authService.isLoggedIn()){

    console.log('Token is Generated '+ token);
    return true;
  }
  else{
    console.log('Token is not generated false');
    router.navigate(['/login']);
    return false
  }
};
