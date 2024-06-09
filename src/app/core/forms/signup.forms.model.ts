import { InputCase } from '../enums/input-case.enum';
import { Input } from '../models/input.model.dto';

export const signupFormsLeftSide: Input[] = [
  {
    case: InputCase.TEXT,
    formControlName: 'firstName',
    placeholder: 'Nome',
  },
  {
    case: InputCase.TEXT,
    formControlName: 'email',
    placeholder: 'Email',
  },
  {
    case: InputCase.SUS,
    formControlName: 'susNumber',
    placeholder: 'Nº do SUS',
  },
  {
    case: InputCase.PASSWORD,
    formControlName: 'password',
    placeholder: 'Senha',
  },
];

export const signupFormsRightSide: Input[] = [
  {
    case: InputCase.TEXT,
    formControlName: 'lastName',
    placeholder: 'Sobrenome',
  },
  {
    case: InputCase.TELEPHONE,
    formControlName: 'telephone',
    placeholder: 'Telefone',
  },
  {
    case: InputCase.DOCUMENT,
    formControlName: 'document',
    placeholder: 'CPF',
  },
  {
    case: InputCase.PASSWORD,
    formControlName: 'confirmPassword',
    placeholder: 'Confirmação da Senha',
  },
];
