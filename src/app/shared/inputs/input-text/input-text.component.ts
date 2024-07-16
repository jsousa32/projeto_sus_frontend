import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, FloatLabelModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent implements OnInit, ControlValueAccessor {
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

  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }
}
