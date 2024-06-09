import { Routes } from '@angular/router';
import { LoginComponent } from './pages/external/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    component: LoginComponent,
  },
];
