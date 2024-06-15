import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-input-otp',
  standalone: true,
  imports: [CommonModule, InputOtpModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input-otp.component.html',
  styleUrl: './input-otp.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOtpComponent),
      multi: true,
    },
  ],
})
export class InputOtpComponent implements ControlValueAccessor {
  @Input({ required: true })
  form!: FormGroup;

  @Input({ required: true })
  formControlName: string = '';

  @Input({ required: true })
  placeholder: string = '';

  @Input({ required: false })
  required: boolean = true;

  @Input({ required: false })
  readonly: boolean = false;

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}
