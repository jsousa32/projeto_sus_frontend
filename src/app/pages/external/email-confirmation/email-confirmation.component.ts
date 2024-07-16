import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { SwalertUtils } from '../../../core/utils/swalert.utils';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { InputOtpComponent } from '../../../shared/inputs/input-otp/input-otp.component';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [CommonModule, CarouselComponent, ButtonsComponent, RouterLink, ReactiveFormsModule, InputOtpComponent],
  templateUrl: './email-confirmation.component.html',
  styleUrl: './email-confirmation.component.scss',
})
export default class EmailConfirmationComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected loading = false;
  protected forms = this.fb.group({
    token: ['', [Validators.required]],
  });

  confirmation() {
    this.authService
      .emailConfirmation(this.forms.value.token!)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => {
        SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Email confirmado com sucesso').then((confirm) => {
          if (confirm) this.router.navigate(['/dashboard']);
        });
      });
  }
}
