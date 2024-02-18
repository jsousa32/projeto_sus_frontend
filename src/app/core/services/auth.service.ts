import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RoutesAuthEnum } from '../enums/routes.enum';
import { AccessToken } from '../models/accessToken.dto.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url = 'http://localhost:8080/auth/';

    protected httpClient = inject(HttpClient);

    login(email: string, password: string) {
        const headers = this.buildHeaderWithBasicAuth(email, password);

        return this.httpClient.post<AccessToken>(this.url + RoutesAuthEnum.LOGIN, {}, { headers: headers });
    }

    confirmEmail(token: string, email: string, password: string) {
        let params = new HttpParams();

        const headers = this.buildHeaderWithBasicAuth(email, password);

        params = params.append('token', token);

        return this.httpClient.post<AccessToken>(
            this.url + RoutesAuthEnum.CONFIRM_EMAIL_PACIENT,
            {},
            { headers: headers, params: params }
        );
    }

    forgetPassword(email: string) {
        let params = new HttpParams();

        params = params.append('email', email);

        return this.httpClient.post<void>(this.url + RoutesAuthEnum.FORGET_PASSWORD, {}, { params: params });
    }

    resetPassword(email: string, password: string) {
        const headers = this.buildHeaderWithBasicAuth(email, password);

        return this.httpClient.post<void>(this.url + RoutesAuthEnum.RESET_PASSWORD, {}, { headers: headers });
    }

    private buildHeaderWithBasicAuth(email: string, password: string) {
        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Basic ' + window.btoa(email + ':' + password));

        return headers;
    }
}
