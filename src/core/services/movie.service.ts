import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CreateMovieDto } from '../../app/interfaces/movie';
import { Movie } from '../../app/interfaces/movie';
import { Category } from '../../app/enums/category.enum';
import { Rating } from '../../app/enums/rating.enum';


const NO_IMAGE = 'https://placehold.co/400x600?text=No+Image';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'The Matrix',
      posterUrl: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg',
      description: `A groundbreaking sci-fi classic that questions the very fabric of reality...`,
      releaseYear: 1999,
      director: 'The Wachowskis',
      rating: Rating.R,
      category: Category.SciFi
    },
    {
      id: 2,
      title: 'Inception',
      posterUrl: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg',
      description: `A mind-bending thriller that dives into the architecture of dreams...`,
      releaseYear: 2010,
      director: 'Christopher Nolan',
      rating: Rating.NC17,
      category: Category.SciFi
    },
    {
      id: 3,
      title: 'Dune: Part Two',
      posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      description: `The epic continuation of Frank Herbert’s legendary saga...`,
      releaseYear: 2024,
      director: 'Denis Villeneuve',
      rating: Rating.PG13,
      category: Category.SciFi
    },
    {
      id: 4,
      title: 'Oppenheimer',
      posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      description: `A sweeping historical drama chronicling the life of J. Robert Oppenheimer...`,
      releaseYear: 2023,
      director: 'Christopher Nolan',
      rating: Rating.R,
      category: Category.Adventure
    }
  ];
  
  private movies$ = new BehaviorSubject<Movie[]>([...this.movies]);

  getAll(): Observable<Movie[]> {
    return this.movies$.asObservable();
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    const m = this.movies.find(x => x.id === id);
    return of(m ? { ...m, posterUrl: m.posterUrl || NO_IMAGE } : undefined);
  }

  createMovie(dto: CreateMovieDto): Observable<Movie> {
    const nextId =
      (this.movies.reduce((max, m) => Math.max(max, m.id), 0) || 0) + 1;

    const movie: Movie = {
      id: nextId,
      title: dto.title,
      posterUrl: dto.posterUrl || NO_IMAGE,
      description: dto.description,
      releaseYear: dto.releaseYear,
      director: dto.director,
      rating: dto.rating,
      category: dto.category
    };

    this.movies.push(movie);
    this.movies$.next([...this.movies]); 

    return of(movie);
  }
}
