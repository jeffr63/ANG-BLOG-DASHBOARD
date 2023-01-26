import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12 bg-secondary-theme p-5 shadow-effect">
          <h3 class="text-center text-theme-primary">
            {{ formStatus }} Categories
          </h3>
          <p class="text-center mb-5">
            You can edit or add categories from here!
          </p>

          <form
            class="form-inline text-center"
            #categoryForm="ngForm"
            (ngSubmit)="onSubmit(categoryForm)"
          >
            <div class="col-md-10">
              <input
                type="text"
                name="category"
                class="form-control shadow-effect"
                placeholder="Add New Category"
                #newCategory="ngModel"
                [(ngModel)]="formCategory"
                required
                [ngClass]="{
                  'is-invalid': newCategory.touched && newCategory.invalid
                }"
              />
              <div
                class="alert alert-danger"
                *ngIf="newCategory.touched && newCategory.invalid"
              >
                Category field is required
              </div>
            </div>

            <div class="col-md-2">
              <button
                class="btn btn-block btn-info mb-2 button-theme"
                [disabled]="categoryForm.invalid"
                ng
                s
              >
                {{ formStatus }} Category
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="row mt-5 mb-5" *ngIf="categories">
        <div class="col-md-6 offset-md-3">
          <div class="card shadow-effect">
            <div class="card-body">
              <table class="table row-border hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let category of categories; let i = index">
                    <td>{{ i + 1 }}</td>
                    <td>{{ category.category }}</td>
                    <td>
                      <button
                        class="btn btn-sm btn-warning"
                        (click)="onEdit(category)"
                      >
                        Edit
                      </button>
                      <button
                        class="btn btn-sm btn-danger ml-2"
                        (click)="onDelete(category)"
                      >
                        Delete
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
      input[type='text'] {
        width: 100%;
      }
    `,
  ],
})
export default class CategoriesComponent implements OnInit, OnDestroy {
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
  formCategory = '';
  categoryId = 0;
  formStatus = 'Add';

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getAll();
  }

  ngOnDestroy(): void {
    this.componentIsDestroyed.next(true);
    this.componentIsDestroyed.complete();
  }

  onDelete(category: Category) {
    if (!category.id) {
      return;
    }
    this.categoriesService.deleteData(category.id);
  }

  onEdit(category: any) {
    this.formCategory = category.category;
    this.categoryId = category.id;
    this.formStatus = 'Edit';
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category,
    };

    if (this.formStatus == 'Add') {
      this.categoriesService.saveData(categoryData);
    } else if (this.formStatus == 'Edit') {
      categoryData.id = this.categoryId;
      this.categoriesService.updateData(categoryData);
      this.formStatus = 'Add';
    }

    formData.reset();
  }
}
