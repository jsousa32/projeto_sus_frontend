import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { signupFormsLeftSide, signupFormsRightSide } from '../../../core/forms/signup.forms.model';
import { Pacient } from '../../../core/models/pacient.model.dto';
import { AuthService } from '../../../core/services/auth.service';
import { PacientService } from '../../../core/services/pacient.service';
import { SwalertUtils } from '../../../core/utils/swalert.utils';
import { TimerUtils } from '../../../core/utils/timer.utils';
import { PasswordValidator } from '../../../core/validators/password.validator';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { InputsComponent } from '../../../shared/inputs2/inputs.component';
import { ButtonsComponent } from './../../../shared/buttons/buttons.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputsComponent, ButtonsComponent, CarouselComponent, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export default class SignupComponent {
  private fb = inject(FormBuilder);
  private pacientService = inject(PacientService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected loading = false;
  protected transition: boolean = true;
  protected formsRightSide = signupFormsRightSide;
  protected formsLeftSide = signupFormsLeftSide;

  protected forms = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      susNumber: ['', [Validators.required]],
      document: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: [PasswordValidator] }
  );

  constructor() {
    TimerUtils.check(2000).then((value) => (this.transition = value));
  }

  signup() {
    this.pacientService
      .save(this.forms.value as Pacient)
      .pipe(
        switchMap((_) => this.authService.login(this.forms.value.email!, this.forms.value.password!)),
        finalize(() => (this.loading = false))
      )
      .subscribe(() => {
        SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Usuario cadastrado com sucesso').then((confirm) => {
          if (confirm) this.router.navigate(['/dashboard']);
        });
      });
  }
}
