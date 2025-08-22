import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Category } from '../../app/enums/category.enum';
import { WatchlistService } from '../../app/services/watchlist.service';
import { Movie, MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  private readonly watchlistService = inject(WatchlistService)
  movies: Movie[] = [];
  readonly FALLBACK = 'https://placehold.co/400x600?text=No+Image';
  selectedCategory: Category | null = null;

  constructor(private movieSvc: MovieService) { }

  ngOnInit(): void {
    this.movieSvc.getAll().subscribe(ms => this.movies = ms);
  }

  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement | null;
    if (img && img.src !== this.FALLBACK) img.src = this.FALLBACK;
  }


  addToWatchlist(movieId: string): void {
    this.watchlistService.addToWatchlist(movieId);
  }

  get filteredMovies(): Movie[] {
    if (!this.selectedCategory) return this.movies;
    return this.movies.filter(m => m.category === this.selectedCategory);
  }

  get categories(): string[] {
    return Object.values(Category);
  }

}
