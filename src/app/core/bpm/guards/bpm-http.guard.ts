import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BpmProfileService } from '../services/bpm-profile.service';

export const bpmHttpGuard: CanActivateFn = () => {
  const profileService = inject(BpmProfileService);
  const router = inject(Router);
  const auth = profileService.getCurrent();
  if (!auth) return router.navigate(['/errors/403']);
  return true;
};
