import { InputCase } from '../enums/input-case.enum';
import { Input } from '../models/input.model.dto';

export const forgotForm: Input[] = [
  {
    case: InputCase.TEXT,
    formControlName: 'email',
    placeholder: 'Email',
  },
];
