import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from './movies/movie.routes.ts'; // adjust path if needed

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  movies$!: Observable<Movie[]>;
  readonly FALLBACK = 'https://placehold.co/400x600?text=No+Image';

  constructor(private watchlist: WatchlistService) {}

  ngOnInit(): void {
    this.movies$ = this.watchlist.getMovies();
  }

  remove(id: number) {
    this.watchlist.remove(id);
    // refresh stream
    this.movies$ = this.watchlist.getMovies();
  }

  clearAll() {
    this.watchlist.clear();
    this.movies$ = this.watchlist.getMovies();
  }
}
