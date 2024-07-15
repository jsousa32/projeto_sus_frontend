import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
  ],
})
export class InputPasswordComponent implements ControlValueAccessor {
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
