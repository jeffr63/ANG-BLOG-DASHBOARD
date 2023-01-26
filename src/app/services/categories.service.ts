import { Injectable } from '@angular/core';

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

import { Category } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CategoriesService extends EntityCollectionServiceBase<Category> {
  categories: Category[] = [];

  constructor(
    private serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private toastr: ToastrService
  ) {
    super('Categories', serviceElementsFactory);
  }

  deleteData(id: number) {
    const categoryObserver = {
      next: (res: any) => this.toastr.success('Category deleted successfully!'),
      error: (error: any) =>
        this.toastr.error('Could not delete category: ' + error),
    };
    this.delete(id).pipe(take(1)).subscribe(categoryObserver);
  }

  saveData(data: Category) {
    const categoryObserver = {
      next: (res: any) => this.toastr.success('Category added successfully!'),
      error: (error: any) =>
        this.toastr.error('Could not add category: ' + error),
    };
    this.add(data).pipe(take(1)).subscribe(categoryObserver);
  }

  updateData(data: Category) {
    const categoryObserver = {
      next: (res: any) => this.toastr.success('Category updated successfully!'),
      error: (error: any) =>
        this.toastr.error('Could not update category: ' + error),
    };
    this.update(data).pipe(take(1)).subscribe(categoryObserver);
  }
}
