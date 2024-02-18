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
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { DialogsAlertService } from '../../../core/services/dialogs-alert.service';
import { FormConfirm } from './form.structure';

@Component({
    selector: 'app-confirm-email',
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
    templateUrl: './confirm-email.component.html',
    styleUrl: './confirm-email.component.scss',
})
export default class ConfirmEmailComponent {
    private fb = inject(FormBuilder);

    private router = inject(Router);

    private dialogService = inject(DialogsAlertService);

    private authService = inject(AuthService);

    protected formConfirm$ = FormConfirm;

    protected form = this.fb.group({
        tokenEmail: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });

    protected email: string = '';

    protected password: string = '';

    constructor() {
        const navigation = this.router.getCurrentNavigation();

        const state = navigation!.extras.state as {
            email: string;
            password: string;
        };

        this.email = state.email;
        this.password = state.password;
    }

    confirmEmail() {
        const formValues = this.form.value;

        this.dialogService.openDialogLoading(
            'Aguarde',
            `Estamos confirmado o seu e-mail </br> Em instantes você será redirecionado!`,
            'info'
        );

        this.authService
            .confirmEmail(formValues.tokenEmail!, this.email, this.password)
            .pipe()
            .subscribe({
                next: (value) => {
                    if (value != null) {
                        Swal.close();

                        this.dialogService.openDialog('Parabéns!', 'Email confirmado com sucesso.', 'success', false);

                        localStorage.setItem('access_token', value.accessToken);

                        this.router.navigateByUrl('dashboard');
                    }
                },
                error: (e: HttpErrorResponse) => {
                    Swal.close();

                    this.dialogService.openDialog(
                        'Não foi possível confirmar o e-mail',
                        `${e.error.message}`,
                        'error',
                        false
                    );

                    return;
                },
            });
    }

    redirectToLogin() {
        this.router.navigateByUrl('login');
    }
}
