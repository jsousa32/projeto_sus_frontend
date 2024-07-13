import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { forgotForm } from '../../../core/forms/forgot.forms.model';
import { AuthService } from '../../../core/services/auth.service';
import { SwalertUtils } from '../../../core/utils/swalert.utils';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { InputsComponent } from '../../../shared/inputs/inputs.component';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, CarouselComponent, RouterLink, ReactiveFormsModule, ButtonsComponent, InputsComponent],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export default class ForgotComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected loading = false;
  protected forgotForm = forgotForm;
  protected forms = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  forgot() {
    this.authService
      .forgot(this.forms.value.email!)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          SwalertUtils.swalertSuccessWithoutOptions(
            'Parabéns',
            'Solicitação da recuperação de senha enviada com sucesso'
          ).then((confirm) => {
            if (confirm) {
              this.router.navigate(['/login']);
            }
          });
        },
      });
  }
}
