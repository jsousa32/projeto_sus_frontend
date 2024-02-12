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
import { ActivatedRoute, Router } from '@angular/router';
import { FormReset } from './form.structure';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss',
})
export default class ResetPasswordComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private activatedRouter = inject(ActivatedRoute);

    protected visibility: boolean = false;

    protected formReset$ = FormReset;

    protected token = this.activatedRouter.snapshot.paramMap.get('token')

    protected form = this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
    });


    resetPassword() {
        console.log(this.token);
    }

    redirectToLogin() {
        this.router.navigateByUrl('login');
    }
}
