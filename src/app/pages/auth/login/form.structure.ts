import { FormInterface } from '../../../core/interfaces/form.interface';

export const FormAuth: FormInterface[] = [
    {
        appearance: 'outline',
        errorMessage: 'E-mail inválido',
        formControlName: 'email',
        label: 'E-mail',
        placeholder: 'E-mail',
        required: true,
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
