import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, finalize, map, switchMap, tap } from 'rxjs';
import { Pacient, PacientEditableFields } from '../../../../core/models/pacient.model.dto';
import { PacientService } from '../../../../core/services/pacient.service';
import { SwalertUtils } from '../../../../core/utils/swalert.utils';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { PacientFormComponent } from '../../../../shared/forms/pacient-form/pacient-form.component';

@Component({
  selector: 'app-create-pacients',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ButtonsComponent, PacientFormComponent],
  templateUrl: './create-and-edit-pacients.component.html',
  styleUrl: './create-and-edit-pacients.component.scss',
})
export default class CreateAndEditPacientsComponent {
  private fb = inject(FormBuilder);
  private pacientService = inject(PacientService);
  private activatedRouter = inject(ActivatedRoute);
  private router = inject(Router);

  protected loading = false;
  protected pacientId: string | null = null;

  protected params$ = this.activatedRouter.paramMap
    .pipe(
      map((params) => params.get('id')),
      filter((id) => !!id),
      tap((id) => (this.pacientId = id)),
      switchMap((id) => this.pacientService.pacient(id!))
    )
    .subscribe((res) => this.forms.patchValue(res));

  protected forms = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.required]],
    susNumber: [{ value: '', disabled: !!this.pacientId }, [Validators.required]],
    document: [{ value: '', disabled: !!this.pacientId }, [Validators.required]],
  });

  register() {
    this.pacientService
      .saveInternal(this.forms.value as Pacient)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => this.message());
  }

  updated() {
    this.pacientService
      .update(this.pacientId!, this.forms.value as PacientEditableFields)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => this.message());
  }

  private message() {
    SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Paciente cadastrado com sucesso').then((confirm) => {
      if (confirm) this.router.navigate(['pacients']);
    });
  }
}
