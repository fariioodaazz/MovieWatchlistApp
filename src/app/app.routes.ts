import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'movies',
    loadChildren: () =>
      import('../movies/movies.routes').then(m => m.MOVIES_ROUTES)
  },
  {
    path: 'watchlist',
    loadComponent: () =>
      import('./watchlist/watchlist.component').then(m => m.WatchlistComponent)
  },

  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  { path: '**', redirectTo: 'movies' }
];
