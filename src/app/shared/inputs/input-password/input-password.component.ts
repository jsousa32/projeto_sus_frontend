import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
})
export class InputPasswordComponent implements ControlValueAccessor {
  private ngControl = inject(NgControl, { optional: true });

  protected inputValue: any;
  protected isDisabled = false;

  @Input({ required: true })
  id = '';

  @Input({ required: true })
  label = '';

  get controls() {
    return this.ngControl;
  }

  onChanged?: (_: any) => {};
  onTouched?: () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  writeValue(value: any): void {
    this.inputValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
