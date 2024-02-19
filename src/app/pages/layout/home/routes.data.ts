import { UserRole } from '../../../core/enums/user-role.enum';
import { RouterInterface } from '../../../core/interfaces/routes.interface';

export const RoutesDashboard: RouterInterface[] = [
    {
        routerLink: 'dashboard',
        userRole: UserRole.ADMIN,
        icon: 'home',
        label: 'Dashboard',
    },
    {
        routerLink: 'doctors',
        userRole: UserRole.ADMIN || UserRole.PACIENT || UserRole.DOCTOR,
        icon: 'favorite',
        label: 'Médicos',
    },
    {
        routerLink: 'pacients',
        userRole: UserRole.ADMIN,
        icon: 'face',
        label: 'Pacientes',
    },
];
