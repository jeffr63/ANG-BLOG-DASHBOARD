import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12 bg-secondary-theme p-5 shadow-effect">
          <h3 class="text-center text-theme-primary">New Categories</h3>
          <p class="text-center mb-5">You can add new categories from here!</p>

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
                ngModel
              />
            </div>

            <div class="col-md-2">
              <button class="btn btn-block btn-info mb-2 button-theme">
                Add Category
              </button>
            </div>
          </form>
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
export default class CategoriesComponent {
  onSubmit(formData: any) {
    let categoryData = {
      category: formData.value.category,
    };
    console.log(categoryData);
  }
}
