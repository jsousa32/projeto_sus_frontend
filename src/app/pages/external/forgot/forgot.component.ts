import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forgotForm } from '../../../core/forms/forgot.forms.model';
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

  protected forgotForm = forgotForm;
  protected forms = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  forgot() {
    console.log(this.forms);
  }
}
