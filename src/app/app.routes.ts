import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/auth/signup/signup.component'),
    },
    {
        path: 'confirm-email',
        loadComponent: () => import('./pages/auth/confirm-email/confirm-email.component'),
    },
    {
        path: 'forget-password',
        loadComponent: () => import('./pages/auth/forget-password/forget-password.component'),
    },
    {
        path: 'reset-password/:token',
        loadComponent: () => import('./pages/auth/reset-password/reset-password.component'),
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/layout/home/home.component'),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard',
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/internal/dashboard/dashboard.component'),
            },
            {
                path: 'doctors',
                loadComponent: () => import('./pages/internal/doctor/doctor-info/doctor-info.component'),
            },
            {
                path: 'pacients',
                loadComponent: () => import('./pages/internal/pacient/pacient-info/pacient-info.component'),
            },
        ],
    },
];
