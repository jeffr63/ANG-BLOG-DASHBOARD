import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, tap } from 'rxjs';
import { Sub } from '../models/subscriber';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow-effect bg-secondary-theme">
            <div class="card-body text-center">
              <h3 class="text-theme-center">All Subscribers</h3>
              <p>Form here you can manage your subscribers</p>

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
                    <th width="200">Name</th>
                    <th width="200">Email</th>
                    <th width="50">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let sub of subs; let i = index">
                    <td>{{ i + 1 }}</td>
                    <td>{{ sub.name }}</td>
                    <td>{{ sub.email }}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-sm btn-danger ml-2"
                        (click)="deleteSubscriber(sub.id)"
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
      .bg-theme {
        background-color: var(--primary-color);
      }
    `,
  ],
  imports: [CommonModule],
})
export default class SubscribersComponent {
  componentIsDestroyed = new Subject<boolean>();
  subs: Sub[] = [];
  posts$ = this.subscribersService.entities$
    .pipe(takeUntil(this.componentIsDestroyed))
    .pipe(
      tap((data) => {
        this.subs = data;
      })
    )
    .subscribe();

  constructor(private subscribersService: SubscribersService) {}

  ngOnInit() {
    this.subscribersService.getAll();
  }

  ngOnDestroy(): void {
    this.componentIsDestroyed.next(true);
    this.componentIsDestroyed.complete();
  }

  deleteSubscriber(id: number | null | undefined) {
    if (id) {
      this.subscribersService.deleteData(id);
    }
  }
}
