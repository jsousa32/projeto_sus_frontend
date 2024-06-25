import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { InitialsPipe } from '../../../../core/pipes/initials.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [InitialsPipe, CommonModule, MenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  protected name = 'João Lucas';

  protected items: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'ph-user',
    },
    {
      label: 'Sair',
      icon: 'ph-sign-out'
    },
  ];
}
