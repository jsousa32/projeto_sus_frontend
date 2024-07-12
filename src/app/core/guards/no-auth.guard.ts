import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthResponse } from '../models/auth-response.model.dto';
import { StorageUtils } from '../utils/storage.utils';

export const noAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userSession = StorageUtils.find('userSession') as AuthResponse;

  if (!userSession || !userSession.accessToken) {
    return true;
  }

  return router.createUrlTree(['dashboard']);
};
