import { InputCase } from '../enums/input-case.enum';
import { Input } from '../models/input.model.dto';

export const loginForm: Input[] = [
  {
    case: InputCase.TEXT,
    formControlName: 'email',
    placeholder: 'Email',
  },
  {
    case: InputCase.PASSWORD,
    formControlName: 'password',
    placeholder: 'Senha',
  },
];
