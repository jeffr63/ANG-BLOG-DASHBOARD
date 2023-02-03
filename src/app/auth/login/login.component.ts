import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { take } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="card p-5 shadow-effect bg-secondary-theme">
            <div class="card-body">
              <div class="text-center">
                <h3 class="text-theme-primary">Login</h3>
                <p>Please login to your admin account to post a blog post</p>
              </div>
              <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm.value)">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    name="email"
                    #Email="ngModel"
                    ngModel
                    required
                    email
                    [ngClass]="{ 'is-invalid': Email.touched && Email.invalid }"
                  />
                  <div
                    class="alert alert-danger"
                    *ngIf="Email.touched && Email.invalid"
                  >
                    <div *ngIf="Email.errors?.['required']">
                      Email cannot be empty
                    </div>
                    <div *ngIf="Email.errors?.['email']">
                      Please enter a valid email address
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    name="password"
                    #Password="ngModel"
                    ngModel
                    required
                    [ngClass]="{
                      'is-invalid': Password.touched && Password.invalid
                    }"
                  />
                  <div
                    class="alert alert-danger"
                    *ngIf="Password.touched && Password.invalid"
                  >
                    Password cannot be empty
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn btn-info btn-block button-theme"
                  [disabled]="loginForm.invalid"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  imports: [CommonModule, FormsModule, NgIf],
})
export default class LoginComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(formValue: any) {
    const loginObserver = {
      next: (res: any) => {
        this.toastr.success('Login was successfully!');
        this.router.navigate(['/']);
      },
      error: (error: any) => this.toastr.error('Could not login: ' + error),
    };
    this.authService
      .login(formValue.email, formValue.password)
      .pipe(take(1))
      .subscribe(loginObserver);
  }
}
