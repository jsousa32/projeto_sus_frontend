import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { doctorFormsLeftSide, doctorFormsRightSide } from '../../../../core/forms/doctors.forms.model';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputsComponent } from '../../../../shared/inputs/inputs.component';

@Component({
  selector: 'app-create-doctors',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputsComponent, CommonModule, ButtonsComponent],
  templateUrl: './create-doctors.component.html',
  styleUrl: './create-doctors.component.scss'
})
export default class CreateDoctorsComponent {
  private fb = inject(FormBuilder);

  protected formsRightSide = doctorFormsRightSide;
  protected formsLeftSide = doctorFormsLeftSide;

  protected forms = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.required]],
    crm: ['', [Validators.required]],
    document: ['', [Validators.required]],
  });

  register() {
    console.log(this.forms);
  }
}
