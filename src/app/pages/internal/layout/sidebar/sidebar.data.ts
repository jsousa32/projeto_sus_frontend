import { Permissions } from '../../../../core/enums/permissions.enum';
import { Sidebar } from '../../../../core/models/sidebar.model.dto';

export const items: Sidebar[] = [
  // {
  //   label: 'Dashboard',
  //   icon: 'ph-house',
  //   router: 'dashboard',
  //   permissions: [Permissions.ADMIN],
  // },
  {
    label: 'Pacientes',
    icon: 'ph-users-three',
    router: 'pacients',
    permissions: [Permissions.ADMIN, Permissions.DOCTOR],
  },
  {
    label: 'Médicos',
    icon: 'ph-first-aid',
    router: 'doctors',
    permissions: [Permissions.ADMIN, Permissions.PACIENT],
  },
  {
    label: 'Consultas',
    icon: 'ph-calendar',
    router: 'appointments',
    permissions: [Permissions.ADMIN],
  },
  {
    label: 'Minhas Consultas',
    icon: 'ph-calendar',
    router: 'appointments',
    permissions: [Permissions.DOCTOR],
  },
  {
    label: 'Minhas Consultas',
    icon: 'ph-calendar',
    router: 'appointments',
    permissions: [Permissions.PACIENT],
  },
];
