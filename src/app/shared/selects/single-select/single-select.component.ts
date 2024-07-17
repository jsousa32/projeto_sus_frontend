import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { Options } from '../../../core/models/options.model.dto';

@Component({
  selector: 'app-single-select',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.scss',
})
export class SingleSelectComponent implements OnInit, ControlValueAccessor {
  private formGroupDirective = inject(FormGroupDirective);
  private innerValue: any;

  controls!: FormControl;

  @Input({ required: true })
  label = '';

  @Input({ required: true })
  options: Options[] = [];

  @Input()
  id = '';

  @Input()
  hasValidation = false;

  @Input()
  required = true;

  @Input()
  readonly = false;

  @Output()
  changed = new EventEmitter<string>();

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
    if (this.hasValidation && this.id) {
      this.controls = this.formGroupDirective.control.get(this.id) as FormControl;
    }
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

  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }

  onChangedDropdown($event: DropdownChangeEvent) {
    this.value = $event.value;
    this.changed.emit($event.value);
  }
}
