import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-buttons',
  standalone: true,
  host: {
    '[class.primary]': 'primary',
    '[class.secondary]': 'secondary',
    '[class.disabled]': 'disabled',
  },
  imports: [CommonModule, ButtonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  @Input()
  primary: boolean = false;

  @Input()
  secondary: boolean = false;

  @Input({ required: true })
  label: string = '';

  @Input({ required: true })
  rounded: boolean = false;

  @Input()
  disabled: boolean = false;

  @Input({ required: true })
  type: string = '';
}
