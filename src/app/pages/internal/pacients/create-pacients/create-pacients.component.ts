import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { pacientFormsLeftSide, pacientFormsRightSide } from '../../../../core/forms/pacient.forms.model';
import { Pacient } from '../../../../core/models/pacient.model.dto';
import { PacientService } from '../../../../core/services/pacient.service';
import { SwalertUtils } from '../../../../core/utils/swalert.utils';
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
  private pacientService = inject(PacientService);
  private router = inject(Router);

  protected loading = false;
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
    this.pacientService
      .saveInternal(this.forms.value as Pacient)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => {
        SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Paciente cadastrado com sucesso').then((confirm) => {
          if (confirm) this.router.navigate(['pacients']);
        });
      });
  }
}
