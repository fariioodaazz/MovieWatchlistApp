import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from '../core/guards/auth.guard';
import { MovieResolver } from './detail/movie-resolver.service';


export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'list', loadComponent: () => import('./list/list.component').then(m => m.ListComponent) },
      { path: 'add',  loadComponent: () => import('./add/add.component').then(m => m.AddComponent) },
      {
        path: ':id',
        loadComponent: () => import('./detail/detail.component').then(m => m.DetailComponent),
        resolve: { movie: MovieResolver }
      },
      { path: '', pathMatch: 'full', redirectTo: 'list' }
    ]
  }
];
