import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-input-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, InputOtpModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOtpComponent),
      multi: true,
    },
  ],
  templateUrl: './input-otp.component.html',
  styleUrl: './input-otp.component.scss',
})
export class InputOtpComponent implements OnInit, ControlValueAccessor {
  private formGroupDirective = inject(FormGroupDirective);
  private innerValue: any;

  protected controls!: FormControl;

  @Input({ required: true })
  id = '';

  @Input({ required: true })
  label = '';

  @Input({ required: true, transform: numberAttribute })
  length = 0;

  @Input()
  required = true;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (this.innerValue !== v) {
      this.innerValue = v;
      this.onChanged(v);
    }
  }

  onChanged: (_: any) => void = () => {};
  onTouched: (_: any) => void = () => {};

  ngOnInit(): void {
    this.controls = this.formGroupDirective.control.get(this.id) as FormControl;
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
