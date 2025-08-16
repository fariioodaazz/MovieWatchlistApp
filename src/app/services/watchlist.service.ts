import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
    return new Observable(); // TODO: implement
  }

  /**
   * Remove movie from watchlist
   */
  removeFromWatchlist(movieId: string): Observable<boolean> {
    return new Observable(); // TODO: implement
  }

  /**
   * Check if movie is in watchlist
   */
  isInWatchlist(movieId: string): Observable<boolean> {
    return new Observable(); // TODO: implement
  }

  /**
   * Get all watchlist movie IDs
   */
  getWatchlist(): Observable<string[]> {
    return this.watchlist$; // TODO: extend if needed
  }

  /**
   * Clear entire watchlist
   */
  clearWatchlist(): Observable<boolean> {
    return new Observable(); // TODO: implement
  }

  /**
   * Get watchlist count
   */
  getWatchlistCount(): Observable<number> {
    return new Observable(); // TODO: implement
  }

  // Placeholder for future MovieService integration
  // getWatchlistMovies(): Observable<Movie[]> {
  //   return new Observable(); // TODO: implement with MovieService
  // }

  private saveWatchlistToStorage(watchlist: string[]): void {
    // TODO: implement localStorage save
  }

  private loadWatchlistFromStorage(): void {
    // TODO: implement localStorage load
  }
}
