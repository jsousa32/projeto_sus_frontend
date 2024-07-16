import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Appointment } from '../../../../core/models/appointments.model.dto';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputTextComponent } from '../../../../shared/inputs/input-text/input-text.component';

@Component({
  selector: 'app-listing-appointments',
  standalone: true,
  imports: [InputTextComponent, ButtonsComponent, ReactiveFormsModule, TableModule, RouterLink, DatePipe],
  templateUrl: './listing-appointments.component.html',
  styleUrl: './listing-appointments.component.scss',
})
export default class ListingAppointmentsComponent {
  private fb = inject(FormBuilder);

  protected appointments = signal<Appointment[]>([]);

  protected form = this.fb.group({
    filter: [''],
  });
}
