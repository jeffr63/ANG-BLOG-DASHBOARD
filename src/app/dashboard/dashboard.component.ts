import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-5">
          <div class="card shadow-effect">
            <div class="card-body text-center bg-secondary-theme">
              <h1 class="mt-3 text-theme-primary"><i class="bi bi-clipboard-data-fill"></i></h1>
              <h2 class="text-theme-primary">Category</h2>
              <p>Manage Your Category Details Here.</p>
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
      }
    `,
  ],
})
export class DashboardComponent {}
