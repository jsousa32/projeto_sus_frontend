import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, FormsModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements ControlValueAccessor {
  private ngControl = inject(NgControl, { optional: true });

  protected inputValue: any;
  protected isDisabled = false;

  @Output()
  onSelect = new EventEmitter<any>();

  @Input({ required: true })
  id = '';

  @Input({ required: true })
  label = '';

  @Input()
  minDate = new Date(new Date().setHours(0, 0, 0, 0));

  get controls() {
    return this.ngControl;
  }

  onChanged?: (_: any) => {};
  onTouched?: () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
    console.log(this.minDate);
  }

  writeValue(value: any): void {
    console.log(value);
    this.inputValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
    this.onSelect.emit(this.inputValue);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
