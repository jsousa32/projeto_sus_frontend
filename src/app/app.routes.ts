import { Routes } from '@angular/router';
import { Permissions } from './core/enums/permissions.enum';
import { authGuard } from './core/guards/auth.guard';
import { logoutGuard } from './core/guards/logout.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { permissionsGuard } from './core/guards/permissions.guard';
import { LoginComponent } from './pages/external/login/login.component';
import SignupComponent from './pages/external/signup/signup.component';
import { LayoutComponent } from './pages/internal/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    canActivate: [noAuthGuard],
    path: 'login',
    component: LoginComponent,
  },
  {
    canActivate: [logoutGuard],
    path: 'logout',
    component: LoginComponent,
  },
  {
    canActivate: [noAuthGuard],
    path: 'signup',
    component: SignupComponent,
  },
  {
    canActivate: [authGuard],
    path: 'email-confirmation',
    loadComponent: () => import('../app/pages/external/email-confirmation/email-confirmation.component'),
  },
  {
    canActivate: [noAuthGuard],
    path: 'forgot',
    loadComponent: () => import('../app/pages/external/forgot/forgot.component'),
  },
  {
    canActivate: [noAuthGuard],
    path: 'reset/:userId/:expiresAt',
    loadComponent: () => import('../app/pages/external/reset/reset.component'),
  },
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [permissionsGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pacients',
      },
      {
        path: 'pacients',
        data: { permissions: [Permissions.ADMIN, Permissions.DOCTOR] },
        loadComponent: () => import('../app/pages/internal/pacients/listing-pacients/listing-pacients.component'),
      },
      {
        path: 'pacients/new',
        data: { permissions: [Permissions.ADMIN, Permissions.DOCTOR] },
        loadComponent: () =>
          import('./pages/internal/pacients/create-and-edit-pacients/create-and-edit-pacients.component'),
      },
      {
        path: 'pacients/:id',
        data: { permissions: [Permissions.ADMIN, Permissions.DOCTOR] },
        loadComponent: () =>
          import('./pages/internal/pacients/create-and-edit-pacients/create-and-edit-pacients.component'),
      },
      {
        path: 'doctors',
        data: { permissions: [Permissions.ADMIN, Permissions.PACIENT] },
        loadComponent: () => import('../app/pages/internal/doctors/listing-doctors/listing-doctors.component'),
      },
      {
        path: 'doctors/new',
        data: { permissions: [Permissions.ADMIN] },
        loadComponent: () => import('./pages/internal/doctors/create-and-edit-doctors/create-and-edit-doctors.component'),
      },
      {
        path: 'doctors/:id',
        data: { permissions: [Permissions.ADMIN] },
        loadComponent: () => import('./pages/internal/doctors/create-and-edit-doctors/create-and-edit-doctors.component'),
      },
      {
        path: 'appointments',
        data: { permissions: [Permissions.ADMIN, Permissions.PACIENT, Permissions.DOCTOR] },
        loadComponent: () =>
          import('../app/pages/internal/appointments/listing-appointments/listing-appointments.component'),
      },
      {
        path: 'appointments/new',
        data: { permissions: [Permissions.ADMIN, Permissions.PACIENT, Permissions.DOCTOR] },
        loadComponent: () =>
          import('../app/pages/internal/appointments/create-and-edit-appointment/create-and-edit-appointment.component'),
      },
      {
        path: 'appointments/:id',
        data: { permissions: [Permissions.ADMIN, Permissions.PACIENT, Permissions.DOCTOR] },
        loadComponent: () =>
          import('../app/pages/internal/appointments/create-and-edit-appointment/create-and-edit-appointment.component'),
      },
      {
        path: 'profile/:id',
        data: { permissions: [Permissions.ADMIN, Permissions.PACIENT, Permissions.DOCTOR] },
        loadComponent: () =>
          import('../app/pages/internal/profile/profile.component'),
      },
    ],
  },
];
