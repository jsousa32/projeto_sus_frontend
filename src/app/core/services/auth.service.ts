import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, take, tap } from 'rxjs';
import { UserSession } from '../models/user-session.model.dto';
import { CryptoUtils } from '../utils/crypto.utils';
import { StorageUtils } from '../utils/storage.utils';
import { CatchErrorHandler } from './catch-error.handler';
import { Routes } from './routes-back';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  login(email: string, password: string) {
    return this.httpClient
      .post<UserSession>(Routes.RoutesAuthentications.LOGIN, null, {
        headers: this.buildHeaderBasicAuth(email, password),
      })
      .pipe(
        take(1),
        tap((res) => {
          StorageUtils.add('userSession', res);
        }),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }

  emailConfirmation(codeEmailConfirmation: string) {
    return this.httpClient
      .post(Routes.RoutesAuthentications.EMAIL_CONFIRMATION, null, {
        params: new HttpParams().append('codeEmailConfirmation', codeEmailConfirmation),
      })
      .pipe(
        take(1),
        tap((_) => {
          const userSession = StorageUtils.find('userSession') as UserSession;

          userSession.emailConfirmed = true;

          StorageUtils.add('userSession', userSession);
        }),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }

  forgot(email: string) {
    return this.httpClient
      .post(Routes.RoutesAuthentications.FORGOT, null, {
        params: new HttpParams().append('email', email),
      })
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }

  reset(userId: string, password: string) {
    return this.httpClient
      .post(Routes.RoutesAuthentications.RESET, null, {
        params: new HttpParams().append('userId', userId).append('password', CryptoUtils.encrypt(password)),
      })
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => CatchErrorHandler.err(err))
      );
  }

  private buildHeaderBasicAuth(email: string, senha: string) {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Basic ' + window.btoa(email + ':' + senha));

    return headers;
  }
}
