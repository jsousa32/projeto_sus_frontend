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
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormForget } from './form.structure';

@Component({
    selector: 'app-forget-password',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskDirective,
    ],
    providers: [provideNgxMask()],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.scss',
})
export default class ForgetPasswordComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);

    protected formForget$ = FormForget;

    protected form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
    });

    forgetPassword() {
        console.log(this.form.value.email);
    }

    redirectToLogin() {
        this.router.navigateByUrl('login');
    }
}
