import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../app/interfaces/movie';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  movies: Movie[] = [];
  isLoading = true;
  
  constructor(private movieSvc: MovieService) {}
  
  ngOnInit() {
    this.movieSvc.getAll().subscribe(movies => {
      this.movies = movies;
      this.isLoading = false;
    });
  }
  
  getMoviesAsArray(): Movie[] {
    return this.movies;
  }

  getMovie(): string {
  return this.movies.map(movie => `
    <a href="/movies/${movie.id}" class="group block rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition bg-white">
      <img class="w-full h-[460px] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
           src="${movie.posterUrl}" alt="${movie.title}" />
      <div class="p-3">
        <h3 class="font-semibold text-lg leading-tight group-hover:underline">${movie.title}</h3>
        <p class="text-sm text-gray-600">${movie.category} • ${movie.releaseYear}</p>
      </div>
    </a>
  `).join('');
}
}