import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (state) => {
  const auth = inject(AuthService);
  return auth.isLoggedIn();
};
