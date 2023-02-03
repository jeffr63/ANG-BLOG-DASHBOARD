import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Subject, takeUntil, tap } from 'rxjs';

import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  standalone: true,
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

      <div class="row">
        <div class="col-md-12">
          <div class="card shadow-effect">
            <div class="card-body">
              <table class="table row-border hover">
                <thead>
                  <tr>
                    <th width="10">No</th>
                    <th width="200">Post Image</th>
                    <th width="200">Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th width="300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let post of posts; let i = index">
                    <td>{{ i + 1 }}</td>
                    <td>
                      <img src="{{ post.postImg }}" class="img img-fluid" />
                    </td>
                    <td>{{ post.title }}</td>
                    <td>{{ post.category.category }}</td>
                    <td>{{ post.createdAt | date }}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-sm btn-warning"
                        routerLink="/posts/new"
                        [queryParams]="{ id: post.id }"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-danger ml-2"
                        (click)="deletePost(post.id)"
                      >
                        Delete
                      </button>
                      <button
                        *ngIf="!post.isFeatured"
                        type="button"
                        class="btn btn-sm btn-success ml-2"
                        (click)="onFeatured(post, true)"
                      >
                        Mark Featured
                      </button>
                      <button
                        *ngIf="post.isFeatured"
                        type="button"
                        class="btn btn-sm btn-info ml-2"
                        (click)="onFeatured(post, false)"
                      >
                        Remove Featured
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
  imports: [CommonModule, RouterLink, NgFor],
})
export default class AllPostsComponent implements OnInit, OnDestroy {
  componentIsDestroyed = new Subject<boolean>();
  posts: Post[] = [];
  posts$ = this.postsService.entities$
    .pipe(takeUntil(this.componentIsDestroyed))
    .pipe(
      tap((data) => {
        this.posts = data;
      })
    )
    .subscribe();

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getAll();
  }

  ngOnDestroy(): void {
    this.componentIsDestroyed.next(true);
    this.componentIsDestroyed.complete();
  }

  deletePost(id: number | null | undefined) {
    if (id) {
      this.postsService.deleteData(id);
    }
  }

  onFeatured(post: Post, isFeatured: boolean) {
    if (post) {
      const postData = {
        ...post,
        isFeatured: isFeatured,
      };
      this.postsService.update(postData);
    }
  }
}
