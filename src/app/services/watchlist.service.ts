import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private readonly STORAGE_KEY = 'watchlist';
  private watchlistSubject = new BehaviorSubject<string[]>([]);
  public watchlist$ = this.watchlistSubject.asObservable();

  constructor() {
    this.loadWatchlistFromStorage();
  }

  /**
   * Add movie to watchlist
   */
  addToWatchlist(movieId: string): Observable<boolean> {
    const current = this.watchlistSubject.value;
    if (!current.includes(movieId)) {
      const updated = [...current, movieId];
      this.watchlistSubject.next(updated);
      this.saveWatchlistToStorage(updated);
      return of(true);
    }
    return of(false);
  }

  /**
   * Remove movie from watchlist
   */
  removeFromWatchlist(movieId: string): Observable<boolean> {
    const current = this.watchlistSubject.value;
    if (current.includes(movieId)) {
      const updated = current.filter(id => id !== movieId);
      this.watchlistSubject.next(updated);
      this.saveWatchlistToStorage(updated);
      return of(true);
    }
    return of(false);
  }

  /**
   * Check if movie is in watchlist
   */
  isInWatchlist(movieId: string): Observable<boolean> {
    return of(this.watchlistSubject.value.includes(movieId));
  }

  /**
   * Get all watchlist movie IDs
   */
  getWatchlist(): Observable<string[]> {
    return this.watchlist$;
  }

  /**
   * Clear entire watchlist
   */
  clearWatchlist(): Observable<boolean> {
    this.watchlistSubject.next([]);
    this.saveWatchlistToStorage([]);
    return of(true);
  }

  /**
   * Get watchlist count
   */
  getWatchlistCount(): Observable<number> {
    return of(this.watchlistSubject.value.length);
  }

  private saveWatchlistToStorage(watchlist: string[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(watchlist));
  }

  private loadWatchlistFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.watchlistSubject.next(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load watchlist from storage', e);
      this.watchlistSubject.next([]);
    }
  }
}
