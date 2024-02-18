import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RoutesUserEnum } from '../enums/routes.enum';
import { PacientModel } from '../models/user.dto.model';

@Injectable({
    providedIn: 'root',
})
export class PacientService {
    private url = 'http://localhost:8080/pacient/';

    protected httpClient = inject(HttpClient);

    signup(pacient: PacientModel) {
        return this.httpClient.post(this.url + RoutesUserEnum.SIGNUP, pacient);
    }
}
