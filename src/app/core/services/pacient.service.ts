import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, take } from 'rxjs';
import { Pacient, PacientEditableFields, PacientPage, PacientResume } from '../models/pacient.model.dto';
import { Page } from '../utils/page.utils';
import { CatchErrorHandler } from './catch-error.handler';
import { Routes } from './routes-back';

@Injectable({
  providedIn: 'root',
})
export class PacientService {
  private httpClient = inject(HttpClient);

  save(pacient: Pacient) {
    return this.httpClient.post(Routes.RoutesPacients.SAVE, pacient).pipe(
      take(1),
      catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
    );
  }

  saveInternal(pacient: Pacient) {
    return this.httpClient.post(Routes.RoutesPacients.SAVE_INTERNAL, pacient).pipe(
      take(1),
      catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
    );
  }

  allPacients(params: HttpParams) {
    return this.httpClient
      .get<Page<PacientPage>>(Routes.RoutesPacients.ALL_PACIENTS, {
        params: params,
      })
      .pipe(take(1));
  }

  allPacientsUnpaged() {
    return this.httpClient.get<Page<PacientPage>>(Routes.RoutesPacients.ALL_PACIENTS_UNPAGED).pipe(take(1));
  }

  pacient(id: string) {
    return this.httpClient
      .get<PacientResume>(Routes.RoutesPacients.PACIENT, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }

  update(id: string, pacient: PacientEditableFields) {
    return this.httpClient
      .patch(Routes.RoutesPacients.UPDATE_PACIENT, pacient, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }

  active(id: string) {
    return this.httpClient
      .patch(Routes.RoutesPacients.ACTIVE_PACIENT, null, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }

  disable(id: string) {
    return this.httpClient
      .delete(Routes.RoutesPacients.DESACTIVE_PACIENT, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }
}
