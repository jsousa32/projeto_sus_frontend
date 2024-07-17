import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { Options } from '../../../core/models/options.model.dto';
import { UserSession } from '../../../core/models/user-session.model.dto';
import { AppointmentsService } from '../../../core/services/appointments.service';
import { DoctorService } from '../../../core/services/doctor.service';
import { PacientService } from '../../../core/services/pacient.service';
import { PermissionsUtils } from '../../../core/utils/permission.utils';
import { StorageUtils } from '../../../core/utils/storage.utils';
import { ButtonsComponent } from '../../buttons/buttons.component';
import { CalendarComponent } from '../../selects/calendar/calendar.component';
import { SingleSelectComponent } from '../../selects/single-select/single-select.component';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SingleSelectComponent, CalendarComponent, ButtonsComponent],
  providers: [DatePipe],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent {
  @Output()
  doctorIdEmitter = new EventEmitter<string>();

  @Output()
  pacientIdEmitter = new EventEmitter<string>();

  private controlContainer = inject(ControlContainer);
  private doctorService = inject(DoctorService);
  private pacientService = inject(PacientService);
  private appointmentService = inject(AppointmentsService);

  protected isAdmin = PermissionsUtils.isAdmin((StorageUtils.find('userSession') as UserSession).permissions);
  protected doctorId = '';
  protected pacientId = '';
  protected doctorOptions: Options[] = [];
  protected pacientOptions: Options[] = [];
  protected hourOptions: Options[] = [];

  protected doctors$ = this.doctorService.allDoctorsUnpaged().pipe(
    tap((res) =>
      res.content.forEach((d) => {
        this.doctorOptions.push({ name: d.firstName, value: d.id! });
      })
    )
  );

  protected pacient$ = this.pacientService.allPacientsUnpaged().pipe(
    tap((res) =>
      res.content.forEach((d) => {
        this.pacientOptions.push({ name: d.firstName, value: d.id! });
      })
    )
  );

  get formGroup() {
    return this.controlContainer.control as FormGroup;
  }

  avaliableTimes() {
    this.appointmentService.avaliableTimes(this.doctorId, this.formGroup.get('date')!.value).subscribe((res) => {
      res.forEach((s) => this.hourOptions.push({ name: s, value: s }));
    });
  }
}
