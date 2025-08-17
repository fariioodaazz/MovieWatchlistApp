import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WatchlistService } from '../core/services/watchlist.service';
import { Movie } from '../core/services/movie.service';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  // IMPORTANT: RouterModule here fixes "Can't bind to 'routerLink'..."
  imports: [CommonModule, RouterModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {
  movies: Movie[] = [];
  readonly FALLBACK = 'https://placehold.co/400x600?text=No+Image';

  constructor(private watchlist: WatchlistService) {
    this.watchlist.getMovies().subscribe(list => (this.movies = list));
  }

  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement | null;
    if (img && img.src !== this.FALLBACK) img.src = this.FALLBACK;
  }

  removeMovie(id: number) {
    this.watchlist.remove(id);
  }

  clearList() {
    this.watchlist.clear();
  }
}
