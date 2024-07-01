import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Appointments } from '../../../../core/models/appointments.model';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputsComponent } from '../../../../shared/inputs/inputs.component';

@Component({
  selector: 'app-listing-appointments',
  standalone: true,
  imports: [InputsComponent, ButtonsComponent, ReactiveFormsModule, TableModule, RouterLink, DatePipe],
  templateUrl: './listing-appointments.component.html',
  styleUrl: './listing-appointments.component.scss',
})
export default class ListingAppointmentsComponent {
  private fb = inject(FormBuilder);

  protected appointments = signal<Appointments[]>([]);

  protected form = this.fb.group({
    filter: [''],
  });
}
