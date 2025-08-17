import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../enums/category.enum';
import { Rating } from '../enums/rating.enum';
import { CreateMovieDto, Movie, UpdateMovieDto } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly STORAGE_KEY = 'movies';
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  public movies$ = this.moviesSubject.asObservable();

  constructor() {
    this.loadMoviesFromStorage();
    this.initializeSampleData();
  }

  // ========================
  // CRUD OPERATIONS
  // ========================

  /**
   * Get all movies
   */
  getMovies(): Observable<Movie[]> {
    return this.movies$;
  }

  /**
   * Get movie by ID
   */
  getMovieById(id: string): Observable<Movie | undefined> {
    return new Observable(observer => {
      const movie = this.moviesSubject.value.find(m => m.id === id);
      observer.next(movie);
      observer.complete();
    });
  }

  /**
   * Create a new movie
   */
  createMovie(movieDto: CreateMovieDto): Observable<Movie> {
    return new Observable(observer => {
      try {
        const newMovie: Movie = {
          id: this.generateId(),
          ...movieDto,
          dateAdded: new Date(),
          isWatched: false
        };

        const currentMovies = this.moviesSubject.value;
        const updatedMovies = [...currentMovies, newMovie];

        this.moviesSubject.next(updatedMovies);
        this.saveMoviesToStorage(updatedMovies);

        observer.next(newMovie);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  /**
   * Update existing movie
   */
  updateMovie(id: string, updateDto: UpdateMovieDto): Observable<Movie> {
    return new Observable(observer => {
      try {
        const currentMovies = this.moviesSubject.value;
        const movieIndex = currentMovies.findIndex(m => m.id === id);

        if (movieIndex === -1) {
          observer.error(new Error(`Movie with ID ${id} not found`));
          return;
        }

        const updatedMovie: Movie = {
          ...currentMovies[movieIndex],
          ...updateDto
        };

        const updatedMovies = [...currentMovies];
        updatedMovies[movieIndex] = updatedMovie;

        this.moviesSubject.next(updatedMovies);
        this.saveMoviesToStorage(updatedMovies);

        observer.next(updatedMovie);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  /**
   * Delete movie
   */
  deleteMovie(id: string): Observable<boolean> {
    return new Observable(observer => {
      try {
        const currentMovies = this.moviesSubject.value;
        const movieExists = currentMovies.some(m => m.id === id);

        if (!movieExists) {
          observer.error(new Error(`Movie with ID ${id} not found`));
          return;
        }

        const updatedMovies = currentMovies.filter(m => m.id !== id);

        this.moviesSubject.next(updatedMovies);
        this.saveMoviesToStorage(updatedMovies);

        observer.next(true);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }



  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveMoviesToStorage(movies: Movie[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(movies));
    } catch (error) {
      console.error('Failed to save movies to localStorage:', error);
    }
  }

  private loadMoviesFromStorage(): void {
    try {
      const storedMovies = localStorage.getItem(this.STORAGE_KEY);
      if (storedMovies) {
        const movies: Movie[] = JSON.parse(storedMovies);
        // Convert date strings back to Date objects
        movies.forEach(movie => {
          movie.dateAdded = new Date(movie.dateAdded);
        });
        this.moviesSubject.next(movies);
      }
    } catch (error) {
      console.error('Failed to load movies from localStorage:', error);
    }
  }

  private initializeSampleData(): void {
    if (this.moviesSubject.value.length === 0) {
      const sampleMovies: CreateMovieDto[] = [
        {
          title: 'The Matrix',
          description: 'A computer programmer discovers reality is actually a simulation.',
          releaseYear: 1999,
          category: Category.SciFi,
          rating: Rating.R,
          duration: 136,
          director: 'The Wachowskis',
          cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
          imdbRating: 8.7
        },
        {
          title: 'Inception',
          description: 'A thief who steals corporate secrets through dream-sharing technology.',
          releaseYear: 2011,
          category: Category.SciFi,
          rating: Rating.PG13,
          duration: 148,
          director: 'Christopher Nolan',
          cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
          imdbRating: 8.8
        },
        
      ];

      sampleMovies.forEach(movieDto => {
        this.createMovie(movieDto).subscribe();
      });
    }
  }
}
