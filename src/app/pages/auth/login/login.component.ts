import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AuthService } from '../../../core/services/auth.service';
import { DialogsAlertService } from '../../../core/services/dialogs-alert.service';
import { FormAuth } from './form.structure';

@Component({
    selector: 'app-login',
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
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private router = inject(Router);

    private fb = inject(FormBuilder);

    private authService = inject(AuthService);

    private dialogService = inject(DialogsAlertService);

    protected visibility: boolean = false;

    protected formAuth$ = FormAuth;

    protected url = 'http://localhost:4200/';

    protected form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    login() {
        const formValues = this.form.value;

        this.authService
            .login(formValues.email!, formValues.password!)
            .pipe()
            .subscribe({
                next: (value) => {
                    if (value != null) {
                        localStorage.setItem('access_token', value.accessToken);

                        this.router.navigateByUrl('dashboard');
                    } else {
                        this.router.navigateByUrl('confirm-email', {
                            state: {
                                email: formValues.email,
                                password: formValues.password,
                            },
                        });
                    }
                },
                error: (e: HttpErrorResponse) => {
                    this.dialogService.openDialog(
                        'Não foi possível realizar login',
                        `<body>${e.error.message}</body>`,
                        'error',
                        false
                    );
                },
            });
    }

    redirectToSign() {
        this.router.navigateByUrl('signup');
    }
}
