import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RoutesUserEnum } from '../enums/routes.enum';
import { PacientModel } from '../models/user.dto.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private url = 'http://localhost:8080/user/';

    protected httpClient = inject(HttpClient);

    signup(pacient: PacientModel) {
        this.httpClient.post(this.url + RoutesUserEnum.SIGNUP, pacient);
    }
}
