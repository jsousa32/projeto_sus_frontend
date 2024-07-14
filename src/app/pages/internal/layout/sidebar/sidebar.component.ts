import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Permissions } from '../../../../core/enums/permissions.enum';
import { UserSession } from '../../../../core/models/user-session.model.dto';
import { StorageUtils } from '../../../../core/utils/storage.utils';
import { items } from './sidebar.data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  @Input({ required: true })
  toggledSidebar = true;

  protected router = inject(Router);
  protected items = items;
  protected userSession = StorageUtils.find("userSession") as UserSession;

  hasPermissions(urlPermissions: Permissions[]) {
    return this.userSession.permissions.some(perm => urlPermissions.includes(perm))
  }
}
