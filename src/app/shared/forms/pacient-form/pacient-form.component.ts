import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { InputMaskComponent } from '../../inputs/input-mask/input-mask.component';
import { InputPasswordComponent } from '../../inputs/input-password/input-password.component';
import { InputTextComponent } from '../../inputs/input-text/input-text.component';

@Component({
  selector: 'app-pacient-form',
  standalone: true,
  imports: [CommonModule, InputTextComponent, InputMaskComponent, InputPasswordComponent, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './pacient-form.component.html',
  styleUrl: './pacient-form.component.scss',
})
export class PacientFormComponent {

  @Input()
  hasPassword: boolean = true;
}
