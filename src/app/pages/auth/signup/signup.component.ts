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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import Swal from 'sweetalert2';
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
        if (!this.validatedPassword()) {
            Swal.fire('Error', 'As senhas não coincidem', 'error');
        }

        console.log('teste');
    }

    private validatedPassword() {
        const formValues = this.form.value;

        return formValues.password == formValues.confirmPassword;
    }
}
