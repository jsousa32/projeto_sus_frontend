import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
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

    protected visibility: boolean = false;

    protected $formAuth = FormAuth;

    form = this.fb.group({
        sus: ['', [Validators.required, Validators.pattern('^[0-9]{15}$')]],
        password: ['', [Validators.required]],
    });

    redirectToSign() {
        this.router.navigateByUrl('signup');
    }
}
