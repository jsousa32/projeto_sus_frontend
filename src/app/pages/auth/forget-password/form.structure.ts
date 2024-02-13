import { FormInterface } from '../../../core/interfaces/form.interface';

export const FormForget: FormInterface[] = [
    {
        appearance: 'outline',
        errorMessage: 'O e-mail está inválido',
        formControlName: 'email',
        label: 'Email',
        placeholder: 'Email',
        required: true,
    },
];
