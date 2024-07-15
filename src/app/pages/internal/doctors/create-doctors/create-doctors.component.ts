import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { doctorFormsLeftSide, doctorFormsRightSide } from '../../../../core/forms/doctors.forms.model';
import { Doctor } from '../../../../core/models/doctors.model.dto';
import { DoctorService } from '../../../../core/services/doctor.service';
import { SwalertUtils } from '../../../../core/utils/swalert.utils';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputsComponent } from '../../../../shared/inputs2/inputs.component';

@Component({
  selector: 'app-create-doctors',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputsComponent, CommonModule, ButtonsComponent],
  templateUrl: './create-doctors.component.html',
  styleUrl: './create-doctors.component.scss',
})
export default class CreateDoctorsComponent {
  private fb = inject(FormBuilder);
  private doctorService = inject(DoctorService);
  private router = inject(Router);

  protected loading = false;
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
    this.doctorService
      .save(this.forms.value as Doctor)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => {
        SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Médico cadastrado com sucesso').then((confirm) => {
          if (confirm) this.router.navigate(['doctors']);
        });
      });
  }
}
