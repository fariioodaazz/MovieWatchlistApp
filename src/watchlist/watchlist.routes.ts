import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { LayoutComponent } from '../movies/layout/layout.component';

export const WATCHLIST_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./watchlist/watchlist.component').then(c => c.WatchlistComponent)
      }
    ]
  }
];
