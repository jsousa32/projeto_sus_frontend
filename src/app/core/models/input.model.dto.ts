import { InputCase } from '../enums/input-case.enum';

export interface Input {
  case: InputCase;
  formControlName: string;
  placeholder: string;
  required?: boolean;
  readonly?: boolean;
}
