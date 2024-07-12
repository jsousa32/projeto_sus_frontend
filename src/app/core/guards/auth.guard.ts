import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthResponse } from '../models/auth-response.model.dto';
import { StorageUtils } from '../utils/storage.utils';

export const authGuard: CanActivateFn = (_, state) => {
  const router = inject(Router);
  const userSession = StorageUtils.find('userSession') as AuthResponse;

  if (!userSession.accessToken) {
    return router.createUrlTree(['login']);
  }

  if (!userSession.accessToken) {
    if (userSession.createdAt < userSession.expiresAt) {
      StorageUtils.removeAll();
      return router.createUrlTree(['login']);
    }
  }

  if (userSession.accessToken && !userSession.emailConfirmed && !state.url.match('email-confirmation')) {
    return router.createUrlTree(['email-confirmation']);
  }

  return true;
};