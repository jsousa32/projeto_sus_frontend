import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { AppointmentPage } from '../../../../core/models/appointments.model.dto';
import { AppointmentsService } from '../../../../core/services/appointments.service';
import { CustomPageable } from '../../../../core/utils/custom-pageable.utils';
import { Page } from '../../../../core/utils/page.utils';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputTextComponent } from '../../../../shared/inputs/input-text/input-text.component';

@Component({
  selector: 'app-listing-appointments',
  standalone: true,
  imports: [
    CommonModule,
    InputTextComponent,
    ButtonsComponent,
    ReactiveFormsModule,
    TableModule,
    MenuModule,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './listing-appointments.component.html',
  styleUrl: './listing-appointments.component.scss',
})
export default class ListingAppointmentsComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private appointmentService = inject(AppointmentsService);
  private router = inject(Router);
  private unsub$ = new Subject<boolean>();
  private filter = '';

  protected appointments = signal<Page<AppointmentPage> | null>(null);
  protected form = this.fb.group({ filter: [''] });
  protected appointmentId = '';

  protected changedValue = this.form.controls.filter.valueChanges
    .pipe(debounceTime(1000), takeUntil(this.unsub$))
    .subscribe((res) => {
      this.filter = res! as string;
      this.lazyLoad(null);
    });

  protected items: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'ph-pencil',
      command: () => this.router.navigate(['appointments', this.appointmentId]),
    },
  ];

  constructor() {
    this.lazyLoad(null);
  }

  lazyLoad(event: TableLazyLoadEvent | null) {
    this.appointmentService
      .allAppointments(CustomPageable.instance(event, this.filter))
      .subscribe((res) => this.appointments.set(res));
  }

  ngOnDestroy(): void {
    this.unsub$.next(true);
    this.unsub$.complete();
  }
}
