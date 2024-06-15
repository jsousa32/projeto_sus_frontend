
import { InputCase } from "../enums/input-case.enum";
import { Input } from "../models/input.model.dto";

export const emailConfirmationForm: Input[] = [
  {
    case: InputCase.TOKEN,
    formControlName: 'token',
    placeholder: 'Token Email',
  },
];
