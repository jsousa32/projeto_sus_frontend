import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { UserSession } from '../../../../core/models/user-session.model.dto';
import { InitialsPipe } from '../../../../core/pipes/initials.pipe';
import { StorageUtils } from '../../../../core/utils/storage.utils';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [InitialsPipe, CommonModule, MenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output()
  toggled = new EventEmitter<boolean>();

  protected toggledSidebar = false;
  protected userSession = StorageUtils.find('userSession') as UserSession;

  protected items: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'ph-user',
      routerLink: ['profile', this.userSession.id],
    },
    {
      label: 'Sair',
      icon: 'ph-sign-out',
      routerLink: ['/logout'],
    },
  ];
}
