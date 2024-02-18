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
import { PacientModel } from '../../../core/models/user.dto.model';
import { DialogsAlertService } from '../../../core/services/dialogs-alert.service';
import { PacientService } from '../../../core/services/pacient.service';
import { FormSignup } from './form.structure';

@Component({
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskDirective,
    ],
    providers: [provideNgxMask()],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export default class SignupComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);

    private dialogService = inject(DialogsAlertService);
    private pacientService = inject(PacientService);

    protected visibility: boolean = false;

    protected formSignup$ = FormSignup;

    protected form = this.fb.group({
        firstName: this.fb.nonNullable.control('', [Validators.required]),
        cpf: this.fb.nonNullable.control('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
        email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
        lastName: this.fb.nonNullable.control('', [Validators.required]),
        sus: this.fb.nonNullable.control('', [Validators.required, Validators.pattern('^[0-9]{15}$')]),
        telephone: this.fb.nonNullable.control('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
        password: this.fb.nonNullable.control('', [Validators.required]),
        confirmPassword: this.fb.nonNullable.control('', [Validators.required]),
    });

    register() {
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

        this.dialogService.openDialogLoading(
            'Aguarde',
            `Estamos finalizando o seu cadastro. </br> Em instantes você será redirecionado!`,
            'info'
        );

        this.pacientService.signup(formValues as PacientModel).subscribe({
            next: () => {
                Swal.close();

                this.dialogService.openDialog(
                    'Seja Bem-vindo(a)!',
                    `<body>O seu usuário foi cadastrado na plataforma.</body>`,
                    'success',
                    false
                );

                this.router.navigateByUrl('login');
            },
            error: (e: HttpErrorResponse) => {
                Swal.close();

                this.dialogService.openDialog(
                    'Não foi possível cadastrar usuário',
                    `<body>${e.error.message}</body>`,
                    'error',
                    false
                );
            },
        });
    }

    redirectToLogin() {
        this.router.navigateByUrl('login');
    }
}
