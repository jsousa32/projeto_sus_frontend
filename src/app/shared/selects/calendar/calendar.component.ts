import { CommonModule, DatePipe } from '@angular/common';
import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, FormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
    DatePipe,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit, ControlValueAccessor {
  private datePipe = inject(DatePipe);
  private formGroupDirective = inject(FormGroupDirective);
  private innerValue: any;

  controls!: FormControl;

  @Input({ required: true })
  id = '';

  @Input({ required: true })
  label = '';

  @Input()
  required = true;

  @Input()
  readonly = false;

  @Input()
  minDate = new Date();

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (this.innerValue !== v) {
      this.innerValue = v;
      this.onChaged(this.datePipe.transform(v, 'dd/MM/yyyy'));
    }
  }

  onChaged: (_: any) => void = () => {};
  onTouched: (_: any) => void = () => {};

  ngOnInit(): void {
    this.controls = this.formGroupDirective.control.get(this.id) as FormControl;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChaged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }
}