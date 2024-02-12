import { FormInterface } from "../../../core/interfaces/form.interface";

export const FormForget: FormInterface[] = [
    {
        appearance: 'outline',
        errorMessage: 'O e-mail está inválido',
        formControlName: 'email',
        label: 'Email',
        placeholder: 'Email',
        required: true,
    },
    {
        appearance: 'outline',
        errorMessage: 'O Número do SUS está inválido',
        formControlName: 'sus',
        label: 'Número do SUS',
        placeholder: 'Número do SUS',
        required: true,
        mask: "000000000000000"
    },
];
