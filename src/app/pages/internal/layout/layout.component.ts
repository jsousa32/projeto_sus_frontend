import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, RouterOutlet],
  template: `
    <div class="flex flex-col h-screen bg-primary/30">
      <app-navbar (toggled)="toggledSidebar = $event"/>

      <div class="flex h-full p-[1rem] gap-[1rem]">
        <app-sidebar [toggledSidebar]="toggledSidebar" />
        <router-outlet />
      </div>
    </div>
  `,
})
export class LayoutComponent {
  protected toggledSidebar = true;
}
