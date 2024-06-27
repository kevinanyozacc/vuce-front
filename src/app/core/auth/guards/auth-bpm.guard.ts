import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthProfileService } from '../services/auth-profile.service';

export const authBpmGuard: CanActivateFn = () => {
  const profileService = inject(AuthProfileService);
  const a = inject(Router);
  const auth = profileService.getCurrent();
  if (!auth) return a.navigate(['/errors/403']);
  return true;
};
