import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PacientModel } from '../../../core/models/user.dto.model';
import { DialogsAlertService } from '../../../core/services/dialogs-alert.service';
import { UserService } from '../../../core/services/user.service';
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
    private userService = inject(UserService);

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
        if (this.validatedPassword()) {
            this.dialogService.openDialog(
                'Senhas Incompatíveis',
                `<body> Teste </br> Teste dois</body>`,
                'error',
                true
            );

            return;
        }

        const pacient: PacientModel = this.form.value as PacientModel;

        console.log(pacient);
    }

    private validatedPassword() {
        const formValues = this.form.value;

        return formValues.password != formValues.confirmPassword;
    }

    redirectToLogin() {
        this.router.navigateByUrl('login');
    }
}
