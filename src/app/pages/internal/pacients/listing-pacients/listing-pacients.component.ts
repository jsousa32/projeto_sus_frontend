import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Pacient } from '../../../../core/models/pacient.model.dto';
import { ButtonsComponent } from '../../../../shared/buttons/buttons.component';
import { InputsComponent } from '../../../../shared/inputs/inputs.component';

@Component({
  selector: 'app-listing-pacients',
  standalone: true,
  imports: [InputsComponent, ButtonsComponent, ReactiveFormsModule, TableModule, RouterLink],
  templateUrl: './listing-pacients.component.html',
  styleUrl: './listing-pacients.component.scss'
})
export default class ListingPacientsComponent {
  private fb = inject(FormBuilder);

  protected pacients = signal<Pacient[]>([]);

  protected form = this.fb.group({
    filter: [''],
  });

}
