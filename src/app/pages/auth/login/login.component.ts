import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormAuth } from './form.structure';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskDirective,
    ],
    providers: [provideNgxMask()],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private router = inject(Router);
    private fb = inject(FormBuilder);

    protected visibility: boolean = false;

    protected formAuth$ = FormAuth;

    protected url = 'http://localhost:4200/';

    protected form = this.fb.group({
        role: ['', Validators.required],
        sus: ['', [Validators.required, Validators.pattern('^[0-9]{15}$')]],
        password: ['', [Validators.required]],
    });

    login() {
        console.log(this.form);
    }

    redirectToSign() {
        this.router.navigateByUrl('signup');
    }
}
