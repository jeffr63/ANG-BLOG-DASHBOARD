import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h3 class="text-center">New Categories</h3>
          <p class="text-center mb-5">You can add new categories from here!</p>

          <form class="form-inline.text-center">
            <div class="form-group col-md-10">
              <input
                tyle="text"
                class="form-control shadow-effect"
                placeholder="Add New Category"
              />
            </div>

            <div class="col-md-2">
              <button class="btn btn-block btn-info mb-2">Add Category</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export default class CategoriesComponent {}
