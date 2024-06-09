import { Routes } from '@angular/router';
import { LoginComponent } from './pages/external/login/login.component';
import SignupComponent from './pages/external/signup/signup.component';

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
    component: SignupComponent,
  },
];
