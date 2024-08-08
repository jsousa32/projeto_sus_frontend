import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { PacientPage } from '../../../../core/models/pacient.model.dto';
import { UserSession } from '../../../../core/models/user-session.model.dto';
import { TelephonePipe } from '../../../../core/pipes/telephone.pipe';
import { PacientService } from '../../../../core/services/pacient.service';
import { CustomPageable } from '../../../../core/utils/custom-pageable.utils';
import { Page } from '../../../../core/utils/page.utils';
import { PermissionsUtils } from '../../../../core/utils/permission.utils';
import { StorageUtils } from '../../../../core/utils/storage.utils';
import { SwalertUtils } from '../../../../core/utils/swalert.utils';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputTextComponent } from '../../../../shared/inputs/input-text/input-text.component';

@Component({
  selector: 'app-listing-pacients',
  standalone: true,
  imports: [
    CommonModule,
    InputTextComponent,
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
export default class ListingPacientsComponent implements OnInit {
  private pacientService = inject(PacientService);
  private router = inject(Router);

  protected loading = false;
  protected pacients = signal<Page<PacientPage> | null>(null);
  protected permissions = (StorageUtils.find('userSession') as UserSession).permissions;
  protected isAdmin = PermissionsUtils.isAdmin(this.permissions)
  protected isDoctor = PermissionsUtils.isDoctor(this.permissions);
  protected filter = new FormControl('');
  protected pacientId = '';

  protected items: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'ph-pencil',
      disabled: !this.isAdmin,
      command: () => this.router.navigate(['pacients', this.pacientId]),
    },
    {
      label: 'Desativar',
      icon: 'ph-trash',
      disabled: !this.isAdmin,
      command: () => { this.loading = true; this.disable(); },
    },
  ];

  ngOnInit(): void {
    this.filter.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => this.lazyLoad(null));
    this.lazyLoad(null);
  }

  lazyLoad(event: TableLazyLoadEvent | null) {
    this.pacientService
      .allPacients(CustomPageable.instance(event, this.filter.value))
      .subscribe((res) => this.pacients.set(res));
  }

  disable() {
    SwalertUtils.swalertQuestion('Atenção', 'Você deseja mesmo desativar o paciente?').then((result) => {
      if (result.isConfirmed)
        this.pacientService
          .disable(this.pacientId)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe(() =>
            SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Paciente desativado com sucesso.').then(() =>
              this.lazyLoad(null)
            )
          );
    });
  }
}
