import { InputCase } from '../enums/input-case.enum';
import { Input } from '../models/input.model.dto';

export const resetForm: Input[] = [
  {
    case: InputCase.PASSWORD,
    formControlName: 'password',
    placeholder: 'Senha',
  },
  {
    case: InputCase.PASSWORD,
    formControlName: 'confirmPassword',
    placeholder: 'Confirmação da Senha',
  },
];
