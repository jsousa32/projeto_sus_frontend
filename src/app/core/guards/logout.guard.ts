import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageUtils } from '../utils/storage.utils';

export const logoutGuard: CanActivateFn = () => {
  const router = inject(Router);
  StorageUtils.removeAll();
  return router.createUrlTree(['login']);
};
