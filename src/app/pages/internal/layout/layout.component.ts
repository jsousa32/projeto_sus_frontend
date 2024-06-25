import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent],
  template: `
    <div class="flex flex-col h-screen bg-primary/30">
      <app-navbar (toggled)="toggledSidebar = $event"/>

      <div class="flex h-full">
        <app-sidebar [toggledSidebar]="toggledSidebar" />
      </div>
    </div>
  `,
})
export class LayoutComponent {
  protected toggledSidebar = true;
}
