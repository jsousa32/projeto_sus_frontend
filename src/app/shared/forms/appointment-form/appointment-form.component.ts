import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map } from 'rxjs';
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
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  providers: [DatePipe],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent {
  private controlContainer = inject(ControlContainer);
  private doctorService = inject(DoctorService);
  private pacientService = inject(PacientService);
  private appointmentService = inject(AppointmentsService);
  private datePipe = inject(DatePipe);

  protected isAdmin = PermissionsUtils.isAdmin((StorageUtils.find('userSession') as UserSession).permissions);
  protected hourOptions: Options[] = [];
  public doctorId = new FormControl('', Validators.required);
  public pacientId = new FormControl('', Validators.required);

  protected doctors$ = this.doctorService.allDoctorsUnpaged().pipe(
    map((res) => res.content),
    map((res) =>
      res.map((d) => ({ value: d.id, name: `${d.firstName.toUpperCase()} ${d.lastName.toUpperCase()}` } as Options))
    )
  );

  protected pacient$ = this.pacientService.allPacientsUnpaged().pipe(
    map((res) => res.content),
    map((res) =>
      res.map((p) => ({ value: p.id, name: `${p.firstName.toUpperCase()} ${p.lastName.toUpperCase()}` } as Options))
    )
  );

  get formGroup() {
    return this.controlContainer.control as FormGroup;
  }

  avaliableTimes(date: string) {
    this.appointmentService.avaliableTimes(this.doctorId.value!, date).subscribe((res) => {
      res.forEach((s) => this.hourOptions.push({ name: s, value: s }));
    });
  }
}
