import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h3 class="text-theme-primary">Add New Post</h3>
          <p class="mb-5">You can add your new post here.</p>
        </div>
      </div>
      <form>
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
                  />
                </div>

                <div class="form-group">
                  <label for="formTitle">Permalink</label>
                  <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="permalink"
                    name="permalink"
                    disabled
                  />
                </div>

                <div class="form-group">
                  <label for="formTitle">Exerpt</label>
                  <textarea cols="30" rows="10" class="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-5">
            <div class="card shadow-effect">
              <div class="card-body">
                <div class="form-group">
                  <label for="">Please select a post category</label>
                  <select class="form-control">
                    <option value="" disabled>Please select a category</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="">Post Image</label>
                  <img
                    [src]="imgsrc"
                    class="form-control img-fluid img-preview"
                  />
                  <input type="file" class="form-control" accept="image/*" />
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
                  <textarea cols="30" rows="10" class="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 text-center mt-3 mb-5">
            <button class="btn btn-info bg-theme">Save Post</button>
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
})
export default class NewPostComponent {
  permalink = '';
  imgsrc = './assets/placeholder-image.jpg';

  onTitleChange(e: any) {
    const title = e.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }
}
