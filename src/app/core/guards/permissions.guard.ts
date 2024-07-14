import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Permissions } from '../enums/permissions.enum';
import { UserSession } from '../models/user-session.model.dto';
import { StorageUtils } from '../utils/storage.utils';

export const permissionsGuard: CanActivateFn = (route, _) => {
  const router = inject(Router);

  const userSession = StorageUtils.find('userSession') as UserSession;

  const accessToken = userSession ? userSession.accessToken : null;

  if (!accessToken) {
    return router.createUrlTree(['login']);
  }

  const requiredPermissions = route.data['permissions'] as Permissions[];

  return userSession.permissions.some((perm) => requiredPermissions.includes(perm));
};
