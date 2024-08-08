import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AppointmentPage } from '../../../../core/models/appointments.model.dto';
import { AppointmentsService } from '../../../../core/services/appointments.service';
import { CustomPageable } from '../../../../core/utils/custom-pageable.utils';
import { Page } from '../../../../core/utils/page.utils';
import { SwalertUtils } from '../../../../core/utils/swalert.utils';
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
export default class ListingAppointmentsComponent implements OnInit {
  private appointmentService = inject(AppointmentsService);
  private router = inject(Router);

  protected appointments = signal<Page<AppointmentPage> | null>(null);
  protected filter = new FormControl('');
  protected appointmentId = '';

  protected items: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'ph-pencil',
      command: () => this.router.navigate(['appointments', this.appointmentId]),
    },
    {
      label: 'Excluir',
      icon: 'ph-trash',
      command: () => this.delete(this.appointmentId),
    },
  ];

  ngOnInit(): void {
    this.filter.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => this.lazyLoad(null));
    this.lazyLoad(null);
  }

  lazyLoad(event: TableLazyLoadEvent | null) {
    this.appointmentService
      .allAppointments(CustomPageable.instance(event, this.filter.value))
      .subscribe((res) => this.appointments.set(res));
  }

  delete(appointmentId: string) {
    SwalertUtils.swalertQuestion('Atenção', 'Você deseja mesmo deletar a consulta?').then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.delete(appointmentId).subscribe(() => {
          SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Consulta deletada com sucesso').then(() =>
            this.lazyLoad(null)
          );
        });
      }
    });
  }
}
