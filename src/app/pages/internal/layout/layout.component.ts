import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <div class="h-screen bg-primary/30">
      <app-navbar />
    </div>
  `,
})
export class LayoutComponent {}
