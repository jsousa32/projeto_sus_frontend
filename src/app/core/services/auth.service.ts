import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AccessToken } from '../models/accessToken.dto.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url = 'http://localhost:8080/';

    protected httpClient = inject(HttpClient);

    login(email: string, password: string) {
        let headers = new HttpHeaders();

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append(
            'Authorization',
            'Basic ' + window.btoa(email + ':' + password)
        );

        return this.httpClient.post<AccessToken>(
            `${this.url}auth/login`,
            {},
            {
                headers: headers,
            }
        );
    }

    confirm(token: string) {
        return this.httpClient.post<AccessToken>(
            `${this.url}auth/confirm`,
            {},
            {
                params: new HttpParams().append('token', token),
            }
        );
    }
}
