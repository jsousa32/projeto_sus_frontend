import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AppointmentPage } from '../../../../core/models/appointments.model.dto';
import { UserSession } from '../../../../core/models/user-session.model.dto';
import { AppointmentsService } from '../../../../core/services/appointments.service';
import { CustomPageable } from '../../../../core/utils/custom-pageable.utils';
import { Page } from '../../../../core/utils/page.utils';
import { PermissionsUtils } from '../../../../core/utils/permission.utils';
import { StorageUtils } from '../../../../core/utils/storage.utils';
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
  private isAdmin = PermissionsUtils.isAdmin((StorageUtils.find('userSession') as UserSession).permissions);

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
      visible: this.isAdmin,
      command: () => this.delete(),
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

  delete() {
    SwalertUtils.swalertQuestion('Atenção', 'Você deseja mesmo deletar a consulta?').then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.delete(this.appointmentId).subscribe(() => {
          SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Consulta deletada com sucesso').then(() =>
            this.lazyLoad(null)
          );
        });
      }
    });
  }

  toggle(menu: Menu, event: MouseEvent, appointment: AppointmentPage) {
    const menuItem = this.items.find((res) => res.label == 'Editar')!;

    menuItem.visible = new Date(appointment.date) > new Date();

    menu.toggle(event);
  }
}
