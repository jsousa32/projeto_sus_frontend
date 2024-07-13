import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/auth-response.model.dto';
import { StorageUtils } from '../utils/storage.utils';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const userSession = StorageUtils.find('userSession') as AuthResponse;

  const accessToken = userSession != null ? userSession.accessToken : null;

  const clonedRequest = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${accessToken}`),
  });

  return next(accessToken != null ? clonedRequest : req);
};
