import { CommonModule } from '@angular/common';
import { Component, inject, Input, numberAttribute } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl
} from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-input-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, InputOtpModule],
  templateUrl: './input-otp.component.html',
  styleUrl: './input-otp.component.scss',
})
export class InputOtpComponent implements ControlValueAccessor {
  private ngControl = inject(NgControl, { optional: true });

  protected inputValue: any;
  protected isDisabled = false;

  @Input({ required: true })
  id = '';

  @Input({ required: true })
  label = '';

  @Input({ required: true, transform: numberAttribute })
  length = 0;

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
