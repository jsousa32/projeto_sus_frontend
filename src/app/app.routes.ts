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
        loadComponent: () => import("./pages/auth/signup/signup.component")
    },
];
