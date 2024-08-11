import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { debounceTime, finalize, Observable, Subject, takeUntil } from 'rxjs';
import { DoctorPage } from '../../../../core/models/doctors.model.dto';
import { UserSession } from '../../../../core/models/user-session.model.dto';
import { SpecialityPipe } from '../../../../core/pipes/speciality.pipe';
import { TelephonePipe } from '../../../../core/pipes/telephone.pipe';
import { DoctorService } from '../../../../core/services/doctor.service';
import { CustomPageable } from '../../../../core/utils/custom-pageable.utils';
import { Page } from '../../../../core/utils/page.utils';
import { PermissionsUtils } from '../../../../core/utils/permission.utils';
import { StorageUtils } from '../../../../core/utils/storage.utils';
import { SwalertUtils } from '../../../../core/utils/swalert.utils';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputTextComponent } from '../../../../shared/inputs/input-text/input-text.component';

@Component({
  selector: 'app-listing-doctors',
  standalone: true,
  imports: [
    InputTextComponent,
    ButtonsComponent,
    ReactiveFormsModule,
    TableModule,
    RouterLink,
    CommonModule,
    TelephonePipe,
    MenuModule,
    SpecialityPipe,
  ],
  templateUrl: './listing-doctors.component.html',
  styleUrl: './listing-doctors.component.scss',
})
export default class ListingDoctorsComponent implements OnInit {
  private router = inject(Router);
  private doctorService = inject(DoctorService);
  private unsub$ = new Subject<boolean>();

  protected loading = false;
  protected filter = new FormControl('');
  protected doctorId = '';
  protected isAdmin = PermissionsUtils.isAdmin((StorageUtils.find('userSession') as UserSession).permissions);
  protected doctors$ = new Observable<Page<DoctorPage>>();

  protected items: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'ph-pencil',
      disabled: !this.isAdmin,
      command: () => this.router.navigate(['doctors', this.doctorId]),
    },
    {
      label: 'Desativar',
      icon: 'ph-trash',
      disabled: !this.isAdmin,
      command: () => {
        this.loading = true;
        this.disable();
      },
    },
  ];

  ngOnInit(): void {
    this.filter.valueChanges.pipe(debounceTime(1000), takeUntil(this.unsub$)).subscribe(() => this.lazyLoad(null));

    this.lazyLoad(null);
  }

  lazyLoad(event: TableLazyLoadEvent | null) {
    this.doctors$ = this.doctorService.allDoctors(CustomPageable.instance(event, this.filter.value));
  }

  disable() {
    SwalertUtils.swalertQuestion('Atenção', 'Você deseja mesmo desativar o médico?').then((result) => {
      if (result.isConfirmed && !this.loading)
        this.doctorService
          .disable(this.doctorId)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe(() =>
            SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Médico desativado com sucesso.').then(() =>
              this.lazyLoad(null)
            )
          );
    });
  }
}
