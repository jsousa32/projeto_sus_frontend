import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserRole } from '../../../core/enums/user-role.enum';
import { RoutesDashboard } from './routes.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
    protected routes$ = RoutesDashboard;

    protected admin = UserRole.ADMIN;
}
