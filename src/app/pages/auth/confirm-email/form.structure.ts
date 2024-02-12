import { FormInterface } from '../../../core/interfaces/form.interface';

export const FormConfirm: FormInterface[] = [
    {
        appearance: 'outline',
        errorMessage: 'O código de verificação está inválido',
        formControlName: 'tokenEmail',
        label: 'Código E-mail',
        placeholder: 'Código E-mail',
        required: true,
        mask: '000000',
    },
];
