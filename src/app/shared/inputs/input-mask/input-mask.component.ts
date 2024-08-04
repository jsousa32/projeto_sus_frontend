import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl
} from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-input-mask',
  standalone: true,
  imports: [CommonModule, FormsModule, InputMaskModule],
  templateUrl: './input-mask.component.html',
  styleUrl: './input-mask.component.scss',
})
export class InputMaskComponent implements ControlValueAccessor {
  private ngControl = inject(NgControl, { optional: true });

  protected inputValue: any;
  protected isDisabled = false;

  @Input({ required: true })
  id = '';

  @Input({ required: true })
  label = '';

  @Input({ required: true })
  mask = '';

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
