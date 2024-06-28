import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthProfileService } from '../services/auth-profile.service';

export const authHttpGuard: CanActivateFn = () => {
  const profileService = inject(AuthProfileService);
  const router = inject(Router);
  const auth = profileService.getCurrent();
  if (!auth) return router.navigate(['/errors/403']);
  return true;
};
