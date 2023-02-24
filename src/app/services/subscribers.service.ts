import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

import { Sub } from '../models/subscriber';

@Injectable({ providedIn: 'root' })
export class SubscribersService extends EntityCollectionServiceBase<Sub> {
  constructor(
    private serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private toastr: ToastrService
  ) {
    super('Subscribers', serviceElementsFactory);
  }

  deleteData(id: number) {
    const postObserver = {
      next: (res: any) =>
        this.toastr.success('Subscriber deleted successfully!'),
      error: (error: any) =>
        this.toastr.error('Could not delete post: ' + error),
    };
    this.delete(id).pipe(take(1)).subscribe(postObserver);
  }
}
