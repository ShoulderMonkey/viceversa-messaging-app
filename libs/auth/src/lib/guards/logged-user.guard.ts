import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const loggedUserGuard: CanActivateFn = (
  route,
  state
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getLoggedUser();
  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
