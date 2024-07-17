import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PermissionsUtils } from '../../../../core/utils/permission.utils';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { AppointmentFormComponent } from '../../../../shared/forms/appointment-form/appointment-form.component';

@Component({
  selector: 'app-create-and-edit-appointment',
  standalone: true,
  imports: [RouterLink, ButtonsComponent, AppointmentFormComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-and-edit-appointment.component.html',
  styleUrl: './create-and-edit-appointment.component.scss',
})
export default class CreateAndEditAppointmentComponent {
  private fb = inject(FormBuilder);

  protected isAdmin = PermissionsUtils.isAdmin();
  protected appointmentId: string | null = null;
  protected doctorId: string | null = null;
  protected pacientId: string | null = null;
  protected loading = false;

  protected forms = this.fb.group({
    date: ['', Validators.required],
    hour: ['', Validators.required],
  });

  register() {
    console.log(this.forms);
    console.log(this.doctorId);
    console.log(this.pacientId);
  }

  update() {}
}
