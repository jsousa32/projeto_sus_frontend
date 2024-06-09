import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { signupFormsLeftSide, signupFormsRightSide } from '../../../core/forms/signup.forms.model';
import { TimerUtils } from '../../../core/utils/timer.utils';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { ButtonsComponent } from './../../../shared/buttons/buttons.component';
import { InputsComponent } from './../../../shared/inputs/inputs.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputsComponent, ButtonsComponent, CarouselComponent, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export default class SignupComponent {
  private fb = inject(FormBuilder);

  protected transition: boolean = true;
  protected formsRightSide = signupFormsRightSide;
  protected formsLeftSide = signupFormsLeftSide;

  protected forms = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.required]],
    susNumber: ['', [Validators.required]],
    document: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor() {
    TimerUtils.check(2000).then((value) => this.transition = value);
  }

  signup() {}
}
