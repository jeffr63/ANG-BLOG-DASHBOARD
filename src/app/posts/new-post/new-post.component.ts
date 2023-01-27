import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h3 class="text-theme-primary">Add New Post</h3>
          <p class="mb-5">You can add your new post here.</p>
        </div>
      </div>
      <form [formGroup]="postForm" (ngSubmit)="onSubmit()">
        <div class="row">
          <div class="col-md-7">
            <div class="card shadow-effect">
              <div class="card-body">
                <div class="form-group">
                  <label for="formTitle">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    (keyup)="onTitleChange($event)"
                    formControlName="title"
                    [ngClass]="{
                      'is-invalid': fc['title'].touched && fc['title'].invalid
                    }"
                  />
                  <div *ngIf="fc['title'].errors?.['required']">
                    <div
                      class="alert alert-danger"
                      *ngIf="fc['title'].touched && fc['title'].invalid"
                    >
                      Title is required
                    </div>
                  </div>
                  <div *ngIf="fc['title'].errors?.['minlength']">
                    <div
                      class="alert alert-danger"
                      *ngIf="fc['title'].touched && fc['title'].invalid"
                    >
                      Title must be at least 10 characters
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="formTitle">Permalink</label>
                  <input
                    type="text"
                    class="form-control"
                    formControlName="permalink"
                    [ngClass]="{
                      'is-invalid':
                        fc['permalink'].touched && fc['permalink'].invalid
                    }"
                  />
                  <div *ngIf="fc['permalink'].errors?.['required']">
                    <div
                      class="alert alert-danger"
                      *ngIf="fc['permalink'].touched && fc['permalink'].invalid"
                    >
                      Permalink is required
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="formTitle">Exerpt</label>
                  <textarea
                    cols="30"
                    rows="10"
                    class="form-control"
                    formControlName="excerpt"
                    [ngClass]="{
                      'is-invalid':
                        fc['excerpt'].touched && fc['excerpt'].invalid
                    }"
                  ></textarea>
                  <div *ngIf="fc['excerpt'].errors?.['required']">
                    <div
                      class="alert alert-danger"
                      *ngIf="fc['excerpt'].touched && fc['excerpt'].invalid"
                    >
                      Excerpt is required
                    </div>
                  </div>
                  <div *ngIf="fc['excerpt'].errors?.['minlength']">
                    <div
                      class="alert alert-danger"
                      *ngIf="fc['excerpt'].touched && fc['excerpt'].invalid"
                    >
                      Excerpt must be at least 50 characters
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-5">
            <div class="card shadow-effect">
              <div class="card-body">
                <div class="form-group">
                  <label for="">Please select a post category</label>
                  <select
                    class="form-control"
                    formControlName="category"
                    [ngClass]="{
                      'is-invalid':
                        fc['category'].touched && fc['category'].invalid
                    }"
                  >
                    <option value="">Please select a post category</option>
                    <option
                      *ngFor="let category of categories"
                      value="{{ category.id }}-{{ category.category }}"
                    >
                      {{ category.category }}
                    </option>
                  </select>
                  <div *ngIf="fc['category'].errors?.['required']">
                    <div
                      class="alert alert-danger"
                      *ngIf="fc['category'].touched && fc['category'].invalid"
                    >
                      Category is required
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="">Post Image</label>
                  <img
                    [src]="imgsrc"
                    class="form-control img-fluid img-preview"
                  />
                  <input
                    type="file"
                    class="form-control"
                    formControlName="postImg"
                    accept="image/*"
                    (change)="showPreview($event)"
                    [ngClass]="{
                      'is-invalid':
                        fc['postImg'].touched && fc['postImg'].invalid
                    }"
                  />
                  <div *ngIf="fc['postImg'].errors?.['required']">
                    <div
                      class="alert alert-danger"
                      *ngIf="fc['postImg'].touched && fc['postImg'].invalid"
                    >
                      Post image is required
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3 mb-5">
          <div class="col-md-12">
            <div class="card shadow-effect">
              <div class="card-body">
                <div class="form-group">
                  <label for="">Content</label>
                  <angular-editor
                    [placeholder]="editPlaceholder"
                    formControlName="content"
                  ></angular-editor>
                  <div *ngIf="fc['content'].errors?.['required']">
                    <div
                      class="alert alert-danger"
                      *ngIf="fc['content'].touched && fc['content'].invalid"
                    >
                      Content is required
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 text-center mt-3 mb-5">
            <button class="btn btn-info bg-theme" [disabled]="postForm.invalid">
              Save Post
            </button>
            <button class="btn btn-warning ml-3" routerLink="/posts">
              Back to Post
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .img-preview {
        height: 250px;
      }
    `,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NgFor,
    NgIf,
    AngularEditorModule,
  ],
})
export default class NewPostComponent implements OnInit, OnDestroy {
  permalink = '';
  defaultImgPlaceholder = '/assets/placeholder-image.jpg';
  imgsrc: any = this.defaultImgPlaceholder;
  selectedImg: any = '';
  componentIsDestroyed = new Subject<boolean>();
  categories: Category[] = [];
  categories$ = this.categoriesService.entities$
    .pipe(takeUntil(this.componentIsDestroyed))
    .pipe(
      tap((data) => {
        this.categories = data;
      })
    )
    .subscribe();
  editPlaceholder = 'Add your content here...';

  get fc() {
    return this.postForm.controls;
  }

  postForm!: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private postsService: PostsService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: [{ value: '', disabled: true }, Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.categoriesService.getAll();
  }

  ngOnDestroy(): void {
    this.componentIsDestroyed.next(true);
    this.componentIsDestroyed.complete();
  }

  onSubmit() {
    var selectedCategory = this.postForm.value['category'].split('-');
    var imagePath = this.postForm.value['postImg'].split('\\');
    const postData: Post = {
      title: this.postForm.value['title'],
      permalink: this.permalink,
      excerpt: this.postForm.value['excerpt'],
      category: {
        categoryId: +selectedCategory[0],
        category: selectedCategory[1],
      },
      postImg: `/assets/images/${imagePath[2]}`,
      content: this.postForm.value['content'],
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    this.postsService.saveData(postData);
    this.postForm.reset();
    this.imgsrc = this.defaultImgPlaceholder;
  }

  onTitleChange(e: any) {
    const title = e.target.value;
    this.permalink = title.replace(/\s/g, '-');
    this.postForm.patchValue({ permalink: this.permalink });
  }

  showPreview(e: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgsrc = e.target?.result;
    };

    reader.readAsDataURL(e?.target.files[0]);
    this.selectedImg = e.target.files[0];
  }
}
