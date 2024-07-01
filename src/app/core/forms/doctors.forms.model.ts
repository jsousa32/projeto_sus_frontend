import { InputCase } from '../enums/input-case.enum';
import { Input } from '../models/input.model.dto';

export const doctorFormsLeftSide: Input[] = [
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
    case: InputCase.CRM,
    formControlName: 'crm',
    placeholder: 'Nº do CRM',
  },
];

export const doctorFormsRightSide: Input[] = [
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
];
