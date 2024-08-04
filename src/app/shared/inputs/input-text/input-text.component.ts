import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent implements ControlValueAccessor {
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
