import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, switchMap, map } from 'rxjs';

import { WatchlistService } from '../services/watchlist.service';
import { MovieService } from '../services/movie.service';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  public watchlist$!: Observable<Movie[]>;

  constructor(
    private watchlistService: WatchlistService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.watchlist$ = this.watchlistService.getWatchlist().pipe(
      switchMap(watchlistIds => {
        return this.movieService.getMovies().pipe(
          map(allMovies => allMovies.filter(movie => watchlistIds.includes(movie.id)))
        );
      })
    );
  }

 
  removeFromWatchlist(movieId: string): void {
    this.watchlistService.removeFromWatchlist(movieId);
  }
}