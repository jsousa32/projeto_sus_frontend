import { FormInterface } from '../../../core/interfaces/form.interface';

export const FormAuth: FormInterface[] = [
    {
        appearance: 'outline',
        errorMessage: 'Número do SUS inválido',
        formControlName: 'sus',
        label: 'Número do SUS',
        placeholder: 'Número do SUS',
        required: true,
        mask: '000000000000000',
    },
    {
        appearance: 'outline',
        errorMessage: 'Senha inválida',
        formControlName: 'password',
        label: 'Senha',
        placeholder: 'Senha',
        required: true,
        type: 'password',
        icon: true,
    },
];
