import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Permissions } from '../../../core/enums/permissions.enum';
import { UserSession } from '../../../core/models/user-session.model.dto';
import { AdminService } from '../../../core/services/admin.service';
import { DoctorService } from '../../../core/services/doctor.service';
import { PacientService } from '../../../core/services/pacient.service';
import { StorageUtils } from '../../../core/utils/storage.utils';
import { SwalertUtils } from '../../../core/utils/swalert.utils';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { InputMaskComponent } from '../../../shared/inputs/input-mask/input-mask.component';
import { InputTextComponent } from '../../../shared/inputs/input-text/input-text.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ButtonsComponent, ReactiveFormsModule, InputTextComponent, InputMaskComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export default class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private doctorService = inject(DoctorService);
  private pacientService = inject(PacientService);
  private userSession = StorageUtils.find('userSession') as UserSession;
  private permissions = this.userSession.permissions;
  protected isAdmin = this.permissions.includes(Permissions.ADMIN);
  protected isDoctor = this.permissions.includes(Permissions.DOCTOR);
  protected isPacient = this.permissions.includes(Permissions.PACIENT);
  protected loading = false;

  protected form!: FormGroup;

  constructor() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      document: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadingUserInformations();
  }

  loadingUserInformations() {
    if (this.isAdmin) {
      this.adminService.admin(this.userSession.id).subscribe((res) => this.form.patchValue(res));
    } else if (this.isDoctor) {
      this.form.addControl('crm', new FormControl({ value: '', disabled: true }, Validators.required));
      this.doctorService.doctor(this.userSession.id).subscribe((res) => this.form.patchValue(res));
    } else if (this.isPacient) {
      this.form.addControl('susNumber', new FormControl({ value: '', disabled: true }, Validators.required));
      this.pacientService.pacient(this.userSession.id).subscribe((res) => this.form.patchValue(res));
    }
  }

  update() {
    if (this.isAdmin) {
      this.adminService
        .update(this.userSession.id, this.form.value)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(() => this.message());
    } else if (this.isDoctor) {
      this.doctorService
        .update(this.userSession.id, this.form.value)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(() => this.message());
    } else if (this.isPacient) {
      this.pacientService
        .update(this.userSession.id, this.form.value)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(() => this.message());
    }
  }

  message() {
    return SwalertUtils.swalertSuccessWithoutOptions('Parabéns', 'Informações atualizadas com sucesso.').then(
      (result) => {
        if (result.isConfirmed) {
          this.userSession.name = `${this.form.get('firstName')?.value} ${this.form.get('lastName')?.value}`;
          StorageUtils.add('userSession', this.userSession);
          window.location.reload();
        }
      }
    );
  }
}
