import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {

  @Input({required: true})
  case: string = '';

  @Input({required: true})
  label: string = '';

  @Input({required: true})
  rounded: boolean = false;

  @Input({required: false})
  ngClass: string = '';

  @Input({required: true})
  type: string = ''
}
