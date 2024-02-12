import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private router = inject(Router);
    private fb = inject(FormBuilder);

    protected visibility: boolean = false;

    form = this.fb.group({
        sus: ['', [Validators.required, Validators.pattern('^[0-9]{15}$')]],
        senha: ['', [Validators.required]],
    });

    redirectToSign() {
        this.router.navigateByUrl('signup');
    }
}
