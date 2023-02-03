import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="navbar navbar-expand-lg fixed-top bg-white">
      <div class="container justify-content-center">
        <a href="#" class="site-logo"> ANG-BLOG-DASHBOARD </a>
      </div>
      <div class="container justify-content-center">
        <div *ngIf="this.authService.isAuthenticated">
          <a class="mr-3">{{ userEmail }}</a>
          <button
            type="button"
            class="btn btn-info bg-secondary-theme text-primary"
            (click)="logout()"
          >
            Logout
          </button>
        </div>
        <button
          type="button"
          class="btn btn-info bg-secondary-theme text-primary"
          routerLink="/login"
          *ngIf="!this.authService.isAuthenticated"
        >
          Login
        </button>
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
  imports: [CommonModule, RouterLink],
})
export class HeaderComponent implements OnInit {
  userEmail = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const ls = localStorage.getItem('ang_blog_auth') + '';
    this.userEmail = JSON.parse(ls).email;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
