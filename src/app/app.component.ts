import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  template: `
    <app-header></app-header>

    <!-- <app-category-navbar></app-category-navbar> -->

    <div class="app-body">
      <router-outlet></router-outlet>
    </div>

    <!-- <div class="container justifiy-content-center mt-5 mb-5">
      <app-subscription-form></app-subscription-form>
    </div> -->

    <app-footer></app-footer>
  `,
  styles: [
    `
      .app-body {
        min-height: 45vh;
        margin-top: 150px;
      }
    `,
  ],
})
export default class AppComponent {
  title = 'ANG-BLOG-DASHBOARD';
}
