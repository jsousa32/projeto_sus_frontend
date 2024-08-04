import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, finalize, map, switchMap, tap } from 'rxjs';
import { AppointmentCreate, AppointmentEditableFields } from '../../../../core/models/appointments.model.dto';
import { UserSession } from '../../../../core/models/user-session.model.dto';
import { AppointmentsService } from '../../../../core/services/appointments.service';
import { PermissionsUtils } from '../../../../core/utils/permission.utils';
import { StorageUtils } from '../../../../core/utils/storage.utils';
import { SwalertUtils } from '../../../../core/utils/swalert.utils';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { AppointmentFormComponent } from '../../../../shared/forms/appointment-form/appointment-form.component';

@Component({
  selector: 'app-create-and-edit-appointment',
  standalone: true,
  imports: [RouterLink, ButtonsComponent, AppointmentFormComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-and-edit-appointment.component.html',
  styleUrl: './create-and-edit-appointment.component.scss',
  providers: [DatePipe],
})
export default class CreateAndEditAppointmentComponent {
  @ViewChild(AppointmentFormComponent) child!: AppointmentFormComponent;

  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private appointmentService = inject(AppointmentsService);
  private datePipe = inject(DatePipe);

  protected isAdmin = PermissionsUtils.isAdmin((StorageUtils.find('userSession') as UserSession).permissions);
  protected appointmentId: string | null = null;
  protected loading = false;

  protected params$ = this.activatedRoute.paramMap
    .pipe(
      map((param) => param.get('id')),
      filter((id) => !!id),
      tap((id) => (this.appointmentId = id)),
      switchMap((id) => this.appointmentService.appointment(id!))
    )
    .subscribe((res) => {
      this.forms.patchValue(res);
      this.child.doctorId.patchValue(res.doctor.id!);
      this.child.pacientId.patchValue(res.pacient.id!);
    });

  protected forms = this.fb.group({
    date: [this.datePipe.transform(new Date(), 'dd/MM/yyyy'), Validators.required],
    hour: ['', Validators.required],
  });

  register() {
    this.appointmentService
      .save(this.forms.value as AppointmentCreate, this.child.pacientId.value!, this.child.doctorId.value!)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => this.message());
  }

  update() {
    this.appointmentService
      .update(this.appointmentId!, this.forms.value as AppointmentEditableFields, this.child.pacientId.value!)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => this.message());
  }

  private message() {
    SwalertUtils.swalertSuccessWithoutOptions(
      'Parabéns',
      `Consulta ${this.appointmentId ? 'editada' : 'cadastrada'} com sucesso.`
    ).then((confirm) => {
      if (confirm) this.router.navigate(['appointments']);
    });
  }
}
