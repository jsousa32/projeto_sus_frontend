import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DialogsAlertService } from '../../../core/services/dialogs-alert.service';
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

    private authService = inject(AuthService);

    private dialogService = inject(DialogsAlertService);

    private activatedRouter = inject(ActivatedRoute);

    protected visibility: boolean = false;

    protected formReset$ = FormReset;

    protected token = this.activatedRouter.snapshot.paramMap.get('token');

    protected form = this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
    });

    resetPassword() {
        const email = atob(this.token!);

        const formValues = this.form.value;

        if (formValues.password != formValues.confirmPassword) {
            this.dialogService.openDialog(
                'Senhas Incompatíveis',
                `<body>Por favor, tente novamente.</body>`,
                'error',
                false
            );

            return;
        }

        this.authService.resetPassword(email, formValues.password!).subscribe();

        this.dialogService
            .openDialog('Parabéns', 'Senha resetada com sucesso', 'success', false)
            .subscribe(() => this.router.navigateByUrl('login'));
    }

    redirectToLogin() {
        this.router.navigateByUrl('login');
    }
}
