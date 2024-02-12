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
        loadComponent: () =>
            import('./pages/auth/confirm-email/confirm-email.component'),
    },
    {
        path: 'forget-password',
        loadComponent: () =>
            import('./pages/auth/forget-password/forget-password.component'),
    },
];
