import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { InputMaskComponent } from '../../inputs/input-mask/input-mask.component';
import { InputTextComponent } from '../../inputs/input-text/input-text.component';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [CommonModule, InputTextComponent, InputMaskComponent, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.scss',
})
export class DoctorFormComponent {
  @Input()
  readonly: boolean = false;
}
