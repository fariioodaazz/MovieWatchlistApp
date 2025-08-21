import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../../app/interfaces/movie';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private readonly _list$ = new BehaviorSubject<Movie[]>([]);
  readonly list$ = this._list$.asObservable();

  getMovies(): Observable<Movie[]> {
    return this.list$;
  }

  add(movie: Movie): void {
    const curr = this._list$.value;
    if (!curr.find(m => m.id === movie.id)) {
      this._list$.next([...curr, movie]);
    }
  }

  remove(id: number): void {
    this._list$.next(this._list$.value.filter(m => m.id !== id));
  }

  clear(): void {
    this._list$.next([]);
  }
}
