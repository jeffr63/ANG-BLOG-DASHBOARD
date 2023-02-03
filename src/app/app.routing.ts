import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const APP_ROUTES: Routes = [
  { path: '', title: 'ANG-BLOG Dashboard', component: DashboardComponent },
  {
    path: 'categories',
    title: 'Categories',
    loadComponent: () => import('./categories/categories.component'),
  },
  {
    path: 'posts',
    title: 'Posts',
    loadComponent: () => import('./posts/all-posts/all-posts.component'),
  },
  {
    path: 'posts/new',
    title: 'New Post',
    loadComponent: () => import('./posts/new-post/new-post.component'),
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./auth/login/login.component'),
  },
];
