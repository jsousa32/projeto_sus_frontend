import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { emailConfirmationForm } from '../../../core/forms/email-confirmation.forms.model';
import { AuthService } from '../../../core/services/auth.service';
import { SwalertUtils } from '../../../core/utils/swalert.utils';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { InputsComponent } from '../../../shared/inputs/inputs.component';

@Component({
  selector: 'app-email-confirmation',
  standalone: true,
  imports: [CommonModule, CarouselComponent, ButtonsComponent, InputsComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './email-confirmation.component.html',
  styleUrl: './email-confirmation.component.scss',
})
export default class EmailConfirmationComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected emailConfirmationForm = emailConfirmationForm;
  protected forms = this.fb.group({
    token: ['', [Validators.required]],
  });

  confirmation() {
    this.authService
      .emailConfirmation(this.forms.value.token!)
      .pipe(
        tap((_) => {
          SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Email confirmado com sucesso').then((confirm) => {
            if (confirm) this.router.navigate(['/dashboard']);
          });
        })
      )
      .subscribe();
  }
}
