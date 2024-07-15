import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { debounceTime, Observable, Subject, takeUntil, tap } from 'rxjs';
import { DoctorPage } from '../../../../core/models/doctors.model.dto';
import { UserSession } from '../../../../core/models/user-session.model.dto';
import { TelephonePipe } from '../../../../core/pipes/telephone.pipe';
import { DoctorService } from '../../../../core/services/doctor.service';
import { CustomPageable } from '../../../../core/utils/custom-pageable.utils';
import { Page } from '../../../../core/utils/page.utils';
import { PermissionsUtils } from '../../../../core/utils/permission.utils';
import { StorageUtils } from '../../../../core/utils/storage.utils';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputsComponent } from '../../../../shared/inputs2/inputs.component';

@Component({
  selector: 'app-listing-doctors',
  standalone: true,
  imports: [
    InputsComponent,
    ButtonsComponent,
    ReactiveFormsModule,
    TableModule,
    RouterLink,
    CommonModule,
    TelephonePipe,
  ],
  templateUrl: './listing-doctors.component.html',
  styleUrl: './listing-doctors.component.scss',
})
export default class ListingDoctorsComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private doctorService = inject(DoctorService);
  private userSession = StorageUtils.find('userSession') as UserSession;
  private unsub$ = new Subject<boolean>();
  private filter = '';

  protected isAdmin = PermissionsUtils.isAdmin(this.userSession.permissions);

  protected form = this.fb.group({ filter: [''] });

  protected changedValue = this.form.controls.filter.valueChanges
    .pipe(
      debounceTime(1000),
      takeUntil(this.unsub$),
      tap((f) => {
        this.filter = f!;
        this.lazyLoad(null);
      })
    )
    .subscribe();

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
