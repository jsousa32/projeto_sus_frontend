import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, finalize, map, tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CryptoUtils } from '../../../core/utils/crypto.utils';
import { SwalertUtils } from '../../../core/utils/swalert.utils';
import { PasswordValidator } from '../../../core/validators/password.validator';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { InputPasswordComponent } from '../../../shared/inputs/input-password/input-password.component';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, CarouselComponent, RouterLink, ReactiveFormsModule, ButtonsComponent, InputPasswordComponent],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
})
export default class ResetComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private userId = '';

  protected loading = false;
  protected forms = this.fb.group(
    {
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: [PasswordValidator] }
  );

  protected params$ = this.activatedRouter.paramMap.pipe(
    map((params) => ({
      userId: params.get('userId'),
      expiresAt: params.get('expiresAt'),
    })),
    filter(({ userId, expiresAt }) => !!userId && !!expiresAt),
    tap(({ userId, expiresAt }) => {
      this.userId = atob(userId!);
      this.validationUrl(atob(expiresAt!));
    })
  );

  reset() {
    this.authService
      .reset(this.userId, this.forms.value.password!)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => {
        SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Senha redefinida com sucesso').then((confirm) => {
          if (confirm) this.router.navigate(['login']);
        });
      });
  }

  validationUrl(expiresAt: string) {
    if (new Date(CryptoUtils.decrypt(expiresAt)) < new Date()) {
      SwalertUtils.swalertError('Link Expirado', 'O link solicitado já está expirado.').then((confirm) => {
        if (confirm) this.router.navigate(['login']);
      });
    }
  }
}
