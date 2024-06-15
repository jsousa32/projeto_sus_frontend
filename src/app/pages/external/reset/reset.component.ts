import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { resetForm } from '../../../core/forms/reset.forms.model';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { InputsComponent } from '../../../shared/inputs/inputs.component';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, CarouselComponent, RouterLink, ReactiveFormsModule, ButtonsComponent, InputsComponent],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
})
export default class ResetComponent {
  private fb = inject(FormBuilder);

  protected resetForm = resetForm;
  protected forms = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  reset() {}
}
