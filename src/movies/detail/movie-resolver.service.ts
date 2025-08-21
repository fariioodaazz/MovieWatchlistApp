import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Movie } from '../../app/interfaces/movie';

@Injectable({ providedIn: 'root' })
export class MovieResolver implements Resolve<Movie | null> {
  constructor(private movies: MovieService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Movie | null> {
    const id = Number(route.paramMap.get('id'));
    if (Number.isNaN(id)) {
      // invalid id format
      return of(null);
    }
    return this.movies.getMovieById(id).pipe(
      map(movie => movie ?? null),
      catchError(() => of(null))
    );
  }
}
