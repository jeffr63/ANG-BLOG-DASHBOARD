import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    title: 'ANG-BLOG Dashboard',
    component: DashboardComponent,
    canActivate: [() => inject(AuthService).isLoggedIn()],
  },
  {
    path: 'categories',
    title: 'Categories',
    loadComponent: () => import('./categories/categories.component'),
    canActivate: [() => inject(AuthService).isLoggedIn()],
  },
  {
    path: 'posts',
    title: 'Posts',
    loadComponent: () => import('./posts/all-posts/all-posts.component'),
    canActivate: [() => inject(AuthService).isLoggedIn()],
  },
  {
    path: 'posts/new',
    title: 'New Post',
    loadComponent: () => import('./posts/new-post/new-post.component'),
    canActivate: [() => inject(AuthService).isLoggedIn()],
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./auth/login/login.component'),
  },
];
