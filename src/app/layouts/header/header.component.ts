import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar navbar-expand-lg fixed-top bg-white">
      <div class="container justify-content-center">
        <a href="#" class="site-logo"> ANG-BLOG-DASHBOARD </a>
      </div>
    </header>
  `,
  styles: [
    `
      header {
        height: 100px;
      }

      .site-logo {
        font-size: 1.5em;
      }
    `,
  ],
})
export class HeaderComponent {}
