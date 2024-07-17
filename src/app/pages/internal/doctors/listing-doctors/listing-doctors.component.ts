import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { DoctorPage } from '../../../../core/models/doctors.model.dto';
import { UserSession } from '../../../../core/models/user-session.model.dto';
import { TelephonePipe } from '../../../../core/pipes/telephone.pipe';
import { DoctorService } from '../../../../core/services/doctor.service';
import { CustomPageable } from '../../../../core/utils/custom-pageable.utils';
import { Page } from '../../../../core/utils/page.utils';
import { PermissionsUtils } from '../../../../core/utils/permission.utils';
import { StorageUtils } from '../../../../core/utils/storage.utils';
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
  ],
  templateUrl: './listing-doctors.component.html',
  styleUrl: './listing-doctors.component.scss',
})
export default class ListingDoctorsComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private doctorService = inject(DoctorService);
  private unsub$ = new Subject<boolean>();
  private filter = '';

  protected doctorId = '';
  protected isAdmin = PermissionsUtils.isAdmin((StorageUtils.find('userSession') as UserSession).permissions);

  protected form = this.fb.group({ filter: [''] });

  protected changedValue = this.form.controls.filter.valueChanges
    .pipe(debounceTime(1000), takeUntil(this.unsub$))
    .subscribe((res) => {
      this.filter = res!;
      this.lazyLoad(null);
    });

  protected items: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'ph-pencil',
      command: () => this.router.navigate(['doctors', this.doctorId]),
    },
  ];

  protected doctors$ = new Observable<Page<DoctorPage>>();

  constructor() {
    this.lazyLoad(null);
  }

  lazyLoad(event: TableLazyLoadEvent | null) {
    this.doctors$ = this.doctorService.allDoctors(CustomPageable.instance(event, this.filter));
  }

  ngOnDestroy(): void {
    this.unsub$.next(true);
    this.unsub$.complete();
  }
}
