import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { emailConfirmationForm } from '../../../core/forms/email-confirmation.forms.model';
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

  protected emailConfirmationForm = emailConfirmationForm;
  protected forms = this.fb.group({
    token: ['', [Validators.required]],
  });

  confirmation() {
    console.log(this.forms);
  }
}
