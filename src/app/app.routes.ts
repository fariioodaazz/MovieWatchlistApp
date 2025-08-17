import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('../auth/login/login.component').then(c => c.LoginComponent) },
  { path: 'movies', loadChildren: () => import('../movies/movies.routes').then(r => r.MOVIES_ROUTES) },
  { path: 'watchlist', loadChildren: () => import('./watchlist/watchlist.routes').then(r => r.WATCHLIST_ROUTES) },
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  { path: '**', redirectTo: 'movies' }
];
