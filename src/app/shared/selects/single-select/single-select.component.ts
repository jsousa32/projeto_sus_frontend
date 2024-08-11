import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Options } from '../../../core/models/options.model.dto';

@Component({
  selector: 'app-single-select',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.scss',
})
export class SingleSelectComponent implements ControlValueAccessor {
  private ngControl = inject(NgControl, { optional: true });

  protected inputValue: any;
  protected isDisabled = false;

  @Input({ required: true })
  label = '';

  @Input({ required: true })
  options: Options[] = [];

  @Input()
  emptyMessage = '';

  @Input()
  id = '';

  @Output()
  onSelect = new EventEmitter<string>();

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
