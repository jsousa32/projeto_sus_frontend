import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputTextComponent } from './input-text/input-text.component';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent, InputPasswordComponent],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputsComponent,
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class InputsComponent implements ControlValueAccessor {
  @Input({ required: true })
  case: string = '';

  @Input({ required:  true})
  form: FormGroup = new FormGroup({});

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
