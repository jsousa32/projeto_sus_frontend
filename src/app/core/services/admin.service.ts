import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { Admin, AdminEditableFields, AdminPage } from '../models/admins.model.dto';
import { Page } from '../utils/page.utils';
import { CatchErrorHandler } from './catch-error.handler';
import { Routes } from './routes-back';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private httpClient = inject(HttpClient);

  save(admin: Admin) {
    return this.httpClient
      .post(Routes.RoutesAdmins.SAVE, admin)
      .pipe(
        take(1),
        catchError((err) => CatchErrorHandler.err(err))
      );
  }

  allAdmins(params: HttpParams) {
    return this.httpClient
      .get<Page<AdminPage>>(Routes.RoutesAdmins.ALL_ADMINS, {
        params: params,
      })
      .pipe(take(1));
  }

  admin(id: string) {
    return this.httpClient
      .get<Admin>(Routes.RoutesAdmins.ADMIN, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err) => CatchErrorHandler.err(err))
      );
  }

  update(id: string, admin: AdminEditableFields) {
    return this.httpClient
      .patch(Routes.RoutesAdmins.UPDATE_ADMIN, admin, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err) => CatchErrorHandler.err(err))
      );
  }

  delete(id: string) {
    return this.httpClient
      .delete(Routes.RoutesAdmins.DELETE_ADMIN, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err) => CatchErrorHandler.err(err))
      );
  }
}
