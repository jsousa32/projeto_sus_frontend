import { UserRole } from '../../../core/enums/role.enum';
import { FormInterface } from '../../../core/interfaces/form.interface';

export const FormAuth: FormInterface[] = [
    {
        appearance: 'outline',
        errorMessage: 'Forma de acesso inválido',
        formControlName: 'role',
        label: 'Perfil de Acesso',
        placeholder: 'Perfil de Acesso',
        required: true,
        select: true,
        optionsSelect: [
            { value: UserRole.PACIENT, viewValue: 'Paciente' },
            { value: UserRole.DOCTOR, viewValue: 'Médico' },
            { value: UserRole.ADMIN, viewValue: 'Administrador' },
        ],
    },
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
