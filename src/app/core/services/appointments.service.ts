import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';
import {
  Appointment,
  AppointmentCreate,
  AppointmentEditableFields,
  AppointmentPage,
} from '../models/appointments.model.dto';
import { Page } from '../utils/page.utils';
import { CatchErrorHandler } from './catch-error.handler';
import { Routes } from './routes-back';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private httpClient = inject(HttpClient);

  save(appointment: AppointmentCreate, pacientId: string, doctorId: string) {
    return this.httpClient
      .post(Routes.RoutesAppointments.SAVE, appointment, {
        params: new HttpParams().append('pacientId', pacientId).append('doctorId', doctorId),
      })
      .pipe(
        take(1),
        catchError((err) => CatchErrorHandler.err(err))
      );
  }

  allAppointments(params: HttpParams) {
    return this.httpClient
      .get<Page<AppointmentPage>>(Routes.RoutesAppointments.ALL_APPOINTMENTS, {
        params: params,
      })
      .pipe(take(1));
  }

  appointment(id: string) {
    return this.httpClient
      .get<Appointment>(Routes.RoutesAppointments.APPOINTMENT, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err) => CatchErrorHandler.err(err))
      );
  }

  update(id: string, appointment: AppointmentEditableFields) {
    return this.httpClient
      .patch(Routes.RoutesAppointments.UPDATE_APPOINTMENTS, appointment, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err) => CatchErrorHandler.err(err))
      );
  }

  delete(id: string) {
    return this.httpClient
      .delete(Routes.RoutesAppointments.DELETE_APPOINTMENTS, {
        params: new HttpParams().append('id', id),
      })
      .pipe(
        take(1),
        catchError((err) => CatchErrorHandler.err(err))
      );
  }
}
