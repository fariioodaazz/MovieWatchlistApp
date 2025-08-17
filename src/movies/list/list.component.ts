import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService, Movie } from '../../core/services/movie.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html'
})
export class ListComponent {
  movies$!: Observable<Movie[]>;
  constructor(private movieSvc: MovieService) {
    this.movies$ = this.movieSvc.getAll(); // live
  }
}
