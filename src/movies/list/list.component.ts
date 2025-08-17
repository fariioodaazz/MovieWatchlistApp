import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { MovieService } from '../../app/services/movie.service';
import { WatchlistService } from '../../app/services/watchlist.service';

import { TruncatePipe } from '../../app/pipes/truncate.pipe';
import { Category } from '../../app/enums/category.enum';
import { Movie } from '../../app/interfaces/movie';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TruncatePipe],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  private movieService = inject(MovieService);
  private watchlistService = inject(WatchlistService);

  movies: Movie[] = [];
  filtered: Movie[] = [];
  categories: Category[] = Object.values(Category);
  selectedCategory: Category | 'ALL' = 'ALL';
  searchTerm = '';

  
  private watchlistIds = new Set<string>();

  private subs: Subscription[] = [];

  ngOnInit(): void {
    const s1 = this.movieService.movies$.subscribe(movies => {
      this.movies = movies;
      this.applyFilters();
    });
    this.subs.push(s1);

    const s2 = this.watchlistService.getWatchlist().subscribe(ids => {
      this.watchlistIds = new Set(ids);
    });
    this.subs.push(s2);
  }

  onCategoryChange(value: Category | 'ALL'): void {
    this.selectedCategory = value;
    this.applyFilters();
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.applyFilters();
  }

  private applyFilters(): void {
    let data = [...this.movies];

    if (this.selectedCategory !== 'ALL') {
      data = data.filter(m => m.category === this.selectedCategory);
    }

    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      data = data.filter(m =>
        m.title.toLowerCase().includes(term) ||
        (m.description ?? '').toLowerCase().includes(term)
      );
    }

    this.filtered = data;
  }

  isInWatchlist(movieId: string): boolean {
    return this.watchlistIds.has(movieId);
  }

  toggleWatchlist(movieId: string): void {
    if (this.isInWatchlist(movieId)) {
      this.watchlistService.removeFromWatchlist(movieId).subscribe();
    } else {
      this.watchlistService.addToWatchlist(movieId).subscribe();
    }
  }

  trackById(_: number, item: Movie): string {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}

