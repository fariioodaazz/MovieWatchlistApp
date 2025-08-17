import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie } from '../../core/services/movie.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  movie: Movie | null = null;
  readonly FALLBACK = 'https://placehold.co/400x600?text=No+Image';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe(d => {
      this.movie = (d['movie'] as Movie | null) ?? null;
    });
  }

  back() { this.router.navigate(['/movies/list']); }

  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement | null;
    if (img && img.src !== this.FALLBACK) img.src = this.FALLBACK;
  }
}
