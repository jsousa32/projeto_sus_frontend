import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { InputPasswordComponent } from '../../../shared/inputs/input-password/input-password.component';
import { InputTextComponent } from '../../../shared/inputs/input-text/input-text.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    RouterLink,
    ReactiveFormsModule,
    ButtonsComponent,
    InputTextComponent,
    InputPasswordComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected loading = false;
  protected forms = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  login() {
    this.authService
      .login(this.forms.value.email!, this.forms.value.password!)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => this.router.navigate(['pacients']));
  }
}
