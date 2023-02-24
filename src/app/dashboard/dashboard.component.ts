import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 mb-5">
          <div class="card shadow-effect" [routerLink]="['/categories']">
            <div class="card-body text-center bg-secondary-theme">
              <h1 class="mt-3 text-theme-primary">
                <i class="bi bi-clipboard-data-fill"></i>
              </h1>
              <h2 class="text-theme-primary">Category</h2>
              <p>Manage Your Category Details Here.</p>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-5">
          <div class="card shadow-effect" [routerLink]="['/posts']">
            <div class="card-body text-center bg-secondary-theme">
              <h1 class="mt-3 text-theme-primary">
                <i class="bi bi-file-image"></i>
              </h1>
              <h2 class="text-theme-primary">Posts</h2>
              <p>Manage Your Post Details Here.</p>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-5">
          <div class="card shadow-effect" [routerLink]="['/subscribers']">
            <div class="card-body text-center bg-secondary-theme">
              <h1 class="mt-3 text-theme-primary">
                <i class="bi bi-person-square"></i>
              </h1>
              <h2 class="text-theme-primary">Subscribers</h2>
              <p>Manage Your Subscribers Here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        height: 200px;
        cursor: pointer;
      }
    `,
  ],
})
export class DashboardComponent {}
