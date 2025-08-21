// src/app/app.routes.ts
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
// src/app/app.routes.ts
{
  path: 'login',
  loadComponent: () =>
    import('../auth/login/login.component').then(m => m.LoginComponent)
}
,
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  { path: '**', redirectTo: 'movies' }
];
