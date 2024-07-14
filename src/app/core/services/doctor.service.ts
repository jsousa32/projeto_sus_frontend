import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import { Doctor, DoctorEditableFields, DoctorPage, DoctorResume } from '../models/doctors.model.dto';
import { Page } from '../utils/page.utils';
import { CatchErrorHandler } from './catch-error.handler';
import { Routes } from './routes-back';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private httpClient = inject(HttpClient);

  save(doctor: Doctor) {
    return this.httpClient.post(Routes.RoutesDoctors.SAVE, doctor).pipe(
      take(1),
      catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
    );
  }

  allDoctors(params: HttpParams) {
    return this.httpClient
      .get<Page<DoctorPage>>(Routes.RoutesDoctors.ALL_DOCTORS, {
        params: params,
      })
      .pipe(take(1));
  }

  allDoctorsUnpaged(params: HttpParams) {
    return this.httpClient
      .get<Page<DoctorPage>>(Routes.RoutesDoctors.ALL_DOCTORS_UNPAGED, {
        params: params,
      })
      .pipe(take(1));
  }

  doctor(id: string) {
    return this.httpClient
      .get<DoctorResume>(Routes.RoutesDoctors.DOCTOR, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }

  update(id: string, doctor: DoctorEditableFields) {
    return this.httpClient
      .patch(Routes.RoutesDoctors.UPDATE_DOCTOR, doctor, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }

  active(id: string) {
    return this.httpClient
      .patch(Routes.RoutesDoctors.ACTIVE_DOCTOR, null, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }

  disable(id: string) {
    return this.httpClient
      .delete(Routes.RoutesDoctors.DESACTIVE_DOCTOR, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }
}
