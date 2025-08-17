import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService, Movie } from '../../core/services/movie.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  movies: Movie[] = [];
  readonly FALLBACK = 'https://placehold.co/400x600?text=No+Image';

  constructor(private movieSvc: MovieService) {}

  ngOnInit(): void {
    this.movieSvc.getAll().subscribe(ms => this.movies = ms);
  }

  onImgError(ev: Event) {
    const img = ev.target as HTMLImageElement | null;
    if (img && img.src !== this.FALLBACK) img.src = this.FALLBACK;
  }
}
