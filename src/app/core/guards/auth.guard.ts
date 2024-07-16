import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserSession } from '../models/user-session.model.dto';
import { PermissionsUtils } from '../utils/permission.utils';
import { StorageUtils } from '../utils/storage.utils';

export const authGuard: CanActivateFn = (_, state) => {
  const router = inject(Router);

  const userSession = StorageUtils.find('userSession') as UserSession;

  const accessToken = userSession ? userSession.accessToken : null;

  if (!accessToken) {
    return router.createUrlTree(['login']);
  }

  if (accessToken) {
    if (userSession.createdAt > userSession.expiresAt) {
      StorageUtils.removeAll();
      return router.createUrlTree(['login']);
    }
  }

  if (accessToken && !userSession.emailConfirmed && !state.url.match('email-confirmation')) {
    return router.createUrlTree(['email-confirmation']);
  }

  if (accessToken && userSession.emailConfirmed && PermissionsUtils.isDoctor(userSession.permissions) && !state.url.match('pacients')) {
    return router.createUrlTree(['pacients']);
  }

  if (accessToken && userSession.emailConfirmed && PermissionsUtils.isPacient(userSession.permissions) && !state.url.match('doctors')) {
    return router.createUrlTree(['doctors']);
  }

  return true;
};
