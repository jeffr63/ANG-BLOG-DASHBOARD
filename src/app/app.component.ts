import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  template: `
    <app-header></app-header>

    <div class="app-body">
      <router-outlet></router-outlet>
    </div>

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkLogin();
  }
}
