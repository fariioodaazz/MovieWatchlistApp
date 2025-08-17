// src/core/services/watchlist.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieService, Movie } from './movie.service';

const LS_KEY = 'watchlist_ids';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  constructor(private movies: MovieService) {}

  private readIds(): number[] {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  }

  private writeIds(ids: number[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(ids));
  }

  getIds(): number[] {
    return this.readIds();
  }

  isInWatchlist(id: number): boolean {
    return this.readIds().includes(id);
  }

  add(id: number): void {
    const ids = this.readIds();
    if (!ids.includes(id)) {
      ids.push(id);
      this.writeIds(ids);
    }
  }

  remove(id: number): void {
    const ids = this.readIds().filter(x => x !== id);
    this.writeIds(ids);
  }

  clear(): void {
    this.writeIds([]);
  }

  /** Returns movies currently in the watchlist (kept in stored order). */
  getMovies(): Observable<Movie[]> {
    const ids = this.readIds();
    if (ids.length === 0) return of([]);

    return this.movies.getAll().pipe(
      map((all: Movie[]) => {
        const result: Movie[] = [];
        for (const i of ids) {
          const found = all.find((m: Movie) => m.id === i);
          if (found) result.push(found);
        }
        return result;
      })
    );
  }
}
