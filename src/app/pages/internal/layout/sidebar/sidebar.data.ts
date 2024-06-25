import { Sidebar } from '../../../../core/models/sidebar.model.dto';

export const items: Sidebar[] = [
  {
    label: 'Dashboard',
    icon: 'ph-house',
    router: '/dashboard',
  },
  {
    label: 'Pacientes',
    icon: 'ph-users-three',
    router: '/pacients',
  },
  {
    label: 'Médicos',
    icon: 'ph-first-aid',
    router: '/doctors',
  },
  {
    label: 'Consultas',
    icon: 'ph-calendar',
    router: 'appointments',
  },
];
