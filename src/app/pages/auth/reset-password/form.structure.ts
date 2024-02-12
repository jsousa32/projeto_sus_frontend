import { FormInterface } from "../../../core/interfaces/form.interface";

export const FormReset: FormInterface[] = [
    {
        appearance: 'outline',
        errorMessage: 'A senha está inválida',
        formControlName: 'password',
        label: 'Senha',
        placeholder: 'Senha',
        required: true,
        type: 'password',
    },
    {
        appearance: 'outline',
        errorMessage: 'A confirmação da senha está inválida',
        formControlName: 'confirmPassword',
        label: 'Confirmação Senha',
        placeholder: 'Confirmação Senha',
        required: true,
        type: 'password',
    },
];
