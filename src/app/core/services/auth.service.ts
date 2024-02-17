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

    confirmEmail(token: string) {
        const params = new HttpParams();

        params.append('token', token);

        return this.httpClient.post<AccessToken>(this.url + RoutesAuthEnum.CONFIRM_EMAIL, {}, { params: params });
    }

    forgetPassword(email: string) {
        const params = new HttpParams();

        params.append('email', email);

        return this.httpClient.post(this.url + RoutesAuthEnum.FORGET_PASSWORD, {}, { params: params });
    }

    resetPassword(email: string, password: string) {
        const headers = this.buildHeaderWithBasicAuth(email, password);

        return this.httpClient.post<AccessToken>(this.url + RoutesAuthEnum.RESET_PASSWORD, {}, { headers: headers });
    }

    private buildHeaderWithBasicAuth(email: string, password: string) {
        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Basic ' + window.btoa(email + ':' + password));

        return headers;
    }
}
