import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Doctor } from '../../../../core/models/doctors.model.dto';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputsComponent } from '../../../../shared/inputs/inputs.component';

@Component({
  selector: 'app-listing-doctors',
  standalone: true,
  imports: [InputsComponent, ButtonsComponent, ReactiveFormsModule, TableModule, RouterLink],
  templateUrl: './listing-doctors.component.html',
  styleUrl: './listing-doctors.component.scss'
})
export default class ListingDoctorsComponent {
  private fb = inject(FormBuilder);

  protected doctors = signal<Doctor[]>([]);

  protected form = this.fb.group({
    filter: ['']
  })
}
