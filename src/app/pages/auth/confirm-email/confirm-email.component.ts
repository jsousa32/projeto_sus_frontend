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

    protected formConfirm$ = FormConfirm;

    protected form = this.fb.group({
        tokenEmail: [
            '',
            [Validators.required, Validators.pattern('^[0-9]{6}$')],
        ],
    });

    confirmEmail() {
        console.log(this.form.value.tokenEmail);
    }

    redirectToLogin() {
        this.router.navigateByUrl('login');
    }
}
