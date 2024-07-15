import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-input-mask',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputMaskModule],
  templateUrl: './input-mask.component.html',
  styleUrl: './input-mask.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true,
    },
  ],
})
export class InputMaskComponent implements ControlValueAccessor {
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

  @Input({required: true})
  mask: string = '';

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}
