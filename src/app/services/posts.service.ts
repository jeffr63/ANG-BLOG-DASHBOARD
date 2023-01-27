import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostsService extends EntityCollectionServiceBase<Post> {
  constructor(
    private serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private toastr: ToastrService
  ) {
    super('Posts', serviceElementsFactory);
  }

  deleteData(id: number) {
    const postObserver = {
      next: (res: any) => this.toastr.success('Post deleted successfully!'),
      error: (error: any) =>
        this.toastr.error('Could not delete post: ' + error),
    };
    this.delete(id).pipe(take(1)).subscribe(postObserver);
  }

  saveData(data: Post) {
    const postObserver = {
      next: (res: any) => this.toastr.success('Post added successfully!'),
      error: (error: any) => this.toastr.error('Could not add post: ' + error),
    };
    this.add(data).pipe(take(1)).subscribe(postObserver);
  }

  updateData(data: Post) {
    const postObserver = {
      next: (res: any) => this.toastr.success('Post updated successfully!'),
      error: (error: any) =>
        this.toastr.error('Could not update post: ' + error),
    };
    this.update(data).pipe(take(1)).subscribe(postObserver);
  }
}
