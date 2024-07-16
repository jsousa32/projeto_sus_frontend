import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { PacientPage } from '../../../../core/models/pacient.model.dto';
import { UserSession } from '../../../../core/models/user-session.model.dto';
import { TelephonePipe } from '../../../../core/pipes/telephone.pipe';
import { PacientService } from '../../../../core/services/pacient.service';
import { CustomPageable } from '../../../../core/utils/custom-pageable.utils';
import { Page } from '../../../../core/utils/page.utils';
import { PermissionsUtils } from '../../../../core/utils/permission.utils';
import { StorageUtils } from '../../../../core/utils/storage.utils';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputsComponent } from '../../../../shared/inputs2/inputs.component';

@Component({
  selector: 'app-listing-pacients',
  standalone: true,
  imports: [
    CommonModule,
    InputsComponent,
    ButtonsComponent,
    ReactiveFormsModule,
    TableModule,
    RouterLink,
    MenuModule,
    TelephonePipe,
  ],
  templateUrl: './listing-pacients.component.html',
  styleUrl: './listing-pacients.component.scss',
})
export default class ListingPacientsComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private pacientService = inject(PacientService);
  private router = inject(Router);
  private userSession = StorageUtils.find('userSession') as UserSession;
  private unsub$ = new Subject<boolean>();
  private filter = '';

  protected pacients = signal<Page<PacientPage> | null>(null);

  protected hasPermission =
    PermissionsUtils.isAdmin(this.userSession.permissions) || PermissionsUtils.isDoctor(this.userSession.permissions);

  protected form = this.fb.group({ filter: [''] });
  protected pacientId = '';

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
      command: () => this.router.navigate(['pacients', this.pacientId]),
    },
  ];

  constructor() {
    this.lazyLoad(null);
  }

  lazyLoad(event: TableLazyLoadEvent | null) {
    this.pacientService
      .allPacients(CustomPageable.instance(event, this.filter))
      .subscribe((res) => this.pacients.set(res));
  }

  ngOnDestroy(): void {
    this.unsub$.next(true);
    this.unsub$.complete();
  }
}
