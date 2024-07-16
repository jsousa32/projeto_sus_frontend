import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, finalize, map, switchMap, tap } from 'rxjs';
import { Doctor } from '../../../../core/models/doctors.model.dto';
import { DoctorService } from '../../../../core/services/doctor.service';
import { SwalertUtils } from '../../../../core/utils/swalert.utils';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { DoctorFormComponent } from '../../../../shared/forms/doctor-form/doctor-form.component';

@Component({
  selector: 'app-create-doctors',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ButtonsComponent, DoctorFormComponent],
  templateUrl: './create-and-edit-doctors.component.html',
  styleUrl: './create-and-edit-doctors.component.scss',
})
export default class CreateDoctorsComponent {
  private fb = inject(FormBuilder);
  private doctorService = inject(DoctorService);
  private activatedRouter = inject(ActivatedRoute);
  private router = inject(Router);

  protected loading = false;
  protected doctorId: string | null = null;

  protected params$ = this.activatedRouter.paramMap
    .pipe(
      map((params) => params.get('id')),
      filter((id) => !!id),
      tap((id) => (this.doctorId = id)),
      switchMap((id) => this.doctorService.doctor(id!))
    )
    .subscribe((res) => this.forms.patchValue(res));

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
