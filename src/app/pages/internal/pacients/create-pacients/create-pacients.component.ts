import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { pacientFormsLeftSide, pacientFormsRightSide } from '../../../../core/forms/pacient.forms.model';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputsComponent } from '../../../../shared/inputs/inputs.component';

@Component({
  selector: 'app-create-pacients',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputsComponent, CommonModule, ButtonsComponent],
  templateUrl: './create-pacients.component.html',
  styleUrl: './create-pacients.component.scss',
})
export default class CreatePacientsComponent {
  private fb = inject(FormBuilder);

  protected formsRightSide = pacientFormsRightSide;
  protected formsLeftSide = pacientFormsLeftSide;

  protected forms = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.required]],
    susNumber: ['', [Validators.required]],
    document: ['', [Validators.required]],
  });

  register() {
    console.log(this.forms);
  }
}
