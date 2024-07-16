import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-input-mask',
  standalone: true,
  imports: [CommonModule, FormsModule, InputMaskModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true,
    },
  ],
  templateUrl: './input-mask.component.html',
  styleUrl: './input-mask.component.scss',
})
export class InputMaskComponent implements OnInit, ControlValueAccessor {
  private formGroupDirective = inject(FormGroupDirective);
  private innerValue: any;

  protected controls!: FormControl;

  @Input({ required: true })
  id = '';

  @Input({ required: true })
  label = '';

  @Input({ required: true })
  mask = '';

  @Input()
  required = true;

  @Input()
  readonly = false;

  @Input()
  disabled = false;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (this.innerValue !== v) {
      this.innerValue = v;
      this.onChaged(v);
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

  setDisabledState?(isDisabled: boolean): void {}
}
