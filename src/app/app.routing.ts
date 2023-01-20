import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const APP_ROUTES: Routes = [
  { path: '', title: 'ANG-BLOG Dashboard', component: DashboardComponent },
  {
    path: 'categories',
    title: 'Categories',
    loadComponent: () =>
      import('./categories/categories.component'),
  },
];
