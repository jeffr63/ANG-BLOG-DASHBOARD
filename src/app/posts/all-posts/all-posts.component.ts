import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow-effect bg-secondary-theme">
            <div class="card-body text-center">
              <h3 class="text-theme-center">All Blog Posts</h3>
              <p>Form here you can manage your blog posts</p>

              <button class="btn btn-info bg-theme" routerLink="/posts/new">
                Add New Post
              </button>
              <button class="btn btn-warning ml-2" routerLink="/">
                Back to the Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .bg-theme {
        background-color: var(--primary-color);
      }
    `,
  ],
})
export default class AllPostsComponent {}
