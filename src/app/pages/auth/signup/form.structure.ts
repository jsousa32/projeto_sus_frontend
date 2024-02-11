import { FormInterface } from './../../../core/interfaces/form.interface';

export const FormStructureLeft: FormInterface[] = [
    {
        appearance: 'outline',
        placeholder: 'João',
        formControlName: 'firstName',
        required: true,
        errorMessage: 'O nome está inválido',
        label: 'Nome',
    },
    {
        appearance: 'outline',
        placeholder: '123.456.789-40',
        formControlName: 'cpf',
        required: true,
        errorMessage: 'O CPF está inválido',
        label: 'CPF',
        mask: '000.000.000-00'
    },
    {
        appearance: 'outline',
        placeholder: 'jsousa.quimico@gmail.com',
        formControlName: 'email',
        required: true,
        errorMessage: 'O e-mail está inválido',
        label: 'E-mail',
    },
    {
        appearance: 'outline',
        placeholder: 'Senha',
        formControlName: 'password',
        required: true,
        errorMessage: 'A senha está inválida',
        label: 'Senha',
        type: 'password',
    },
];


export const FormStructureRight: FormInterface[] = [
    {
        appearance: 'outline',
        placeholder: 'Sousa',
        formControlName: 'lastName',
        required: true,
        errorMessage: 'O sobrenome está inválido',
        label: 'Sobrenome',
    },
    {
        appearance: 'outline',
        placeholder: '123456789012345',
        formControlName: 'sus',
        required: true,
        errorMessage: 'O SUS está inválido',
        label: 'SUS',
        mask: '000000000000000'
    },
    {
        appearance: 'outline',
        placeholder: '(35) 9 9191-8644',
        formControlName: 'telephone',
        required: true,
        errorMessage: 'O telefone está inválido',
        label: 'Telefone',
        mask: '(00) 0 0000-0000'
    },
    {
        appearance: 'outline',
        placeholder: 'Confirmação da Senha',
        formControlName: 'confirmPassword',
        required: true,
        errorMessage: 'A confirmação da senha está inválida',
        label: 'Confirmação da Senha',
        type: 'password',
    },
];
