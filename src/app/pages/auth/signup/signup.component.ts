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
import { DialogsAlertService } from '../../../core/services/dialogs-alert.service';
import { FormStructureLeft, FormStructureRight } from './form.structure';

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

    protected visibility: boolean = false;

    protected $formStructureLeft = FormStructureLeft;

    protected $formStructureRight = FormStructureRight;

    form = this.fb.group({
        firstName: ['', Validators.required],
        cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        lastName: ['', Validators.required],
        sus: ['', [Validators.required, Validators.pattern('^[0-9]{15}$')]],
        telephone: [
            '',
            [Validators.required, Validators.pattern('^[0-9]{11}$')],
        ],
        confirmPassword: ['', [Validators.required]],
    });

    register() {
        if (this.validatedPassword()) {
            this.dialogService
                .openDialog(
                    'Senhas Incompatíveis',
                    `<body> Teste </br> Teste dois</body>`,
                    'error',
                    true
                )
                .subscribe(console.log);
        }
    }

    private validatedPassword() {
        const formValues = this.form.value;

        return formValues.password == formValues.confirmPassword;
    }

    redirectToLogin() {
        this.router.navigateByUrl('login');
    }
}
