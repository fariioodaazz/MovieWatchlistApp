// src/movies/detail/detail.component.ts
import { Component } from '@angular/core';
import { CommonModule, Location, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie, MovieService } from '../../core/services/movie.service';
import { WatchlistService } from '../../core/services/watchlist.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  movie: Movie | null = null;
  readonly FALLBACK = 'https://placehold.co/400x600?text=No+Image';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private movies: MovieService,
    private watchlist: WatchlistService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movies.getMovieById(id).subscribe(m => (this.movie = m ?? null));
  }

  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement | null;
    if (img && img.src !== this.FALLBACK) img.src = this.FALLBACK;
  }

  addToWatchlist() {
    if (!this.movie) return;
    this.watchlist.add(this.movie);
    this.router.navigate(['/watchlist']); 
  }

  back() { this.location.back(); }
}
