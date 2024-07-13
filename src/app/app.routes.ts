import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { logoutGuard } from './core/guards/logout.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';
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
    canActivateChild: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../app/pages/internal/dashboard/dashboard.component'),
      },
      {
        path: 'pacients',
        loadComponent: () => import('../app/pages/internal/pacients/listing-pacients/listing-pacients.component'),
      },
      {
        path: 'pacients/new',
        loadComponent: () => import('../app/pages/internal/pacients/create-pacients/create-pacients.component'),
      },
      {
        path: 'doctors',
        loadComponent: () => import('../app/pages/internal/doctors/listing-doctors/listing-doctors.component'),
      },
      {
        path: 'doctors/new',
        loadComponent: () => import('../app/pages/internal/doctors/create-doctors/create-doctors.component'),
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import('../app/pages/internal/appointments/listing-appointments/listing-appointments.component'),
      },
    ],
  },
];
