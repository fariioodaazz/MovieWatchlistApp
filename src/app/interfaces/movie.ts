import { Category } from "../enums/category.enum";
import { Rating } from "../enums/rating.enum";

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  category: Category;
  rating: Rating;
  duration?: number; // in minutes
  director: string;
  cast?: string[];
  posterUrl?: string;
  imdbRating?: number;
  dateAdded?: Date;
  isWatched?: boolean;
}

export interface CreateMovieDto {
  title: string;
  description: string;
  releaseYear: number;
  category: Category;
  rating: Rating;
  duration: number;
  director: string;
  cast: string[];
  posterUrl?: string;
  imdbRating?: number;
}

export interface UpdateMovieDto extends Partial<CreateMovieDto> {
  isWatched?: boolean;
}
