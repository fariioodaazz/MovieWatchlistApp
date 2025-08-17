import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from './../../app/enums/category.enum';
import { Rating } from './../../app/enums/rating.enum';
import { MovieService } from './../../app/services/movie.service';
import { CreateMovieDto } from '../../app/interfaces/movie';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html'
})
export class AddComponent {
  categoryOptions = Object.values(Category);
  ratingOptions = Object.values(Rating);
  submitting = false;
  error = '';

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    releaseYear: [new Date().getFullYear(), [Validators.required, Validators.pattern(/^\d{4}$/)]],
    category: [this.categoryOptions[0] as Category, Validators.required],
    rating: [this.ratingOptions[0] as Rating, Validators.required],
    duration: [120],             
    director: [''],
    cast: [''],
    imdbRating: [7.0],
    posterUrl: [''],
  });

  constructor(private fb: FormBuilder, private movies: MovieService, private router: Router) {}

  submit() {
    this.error = '';
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;

    const v = this.form.value;

    const dto: CreateMovieDto = {
      title: v.title!.trim(),
      description: (v.description || '').trim(),
      releaseYear: Number(v.releaseYear),
      category: v.category as Category,
      rating: v.rating as Rating,
      duration: Number(v.duration) || 0,         // match your interface shape
      director: v.director?.trim() || '',
      cast: (v.cast || '').split(',').map(s => s.trim()).filter(Boolean), // turn "a, b" -> ["a","b"]
      imdbRating: Number(v.imdbRating) || undefined,
      // posterUrl: v.posterUrl?.trim() || undefined,
    };

    this.movies.createMovie(dto).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/movies/list']);
      },
      error: (err) => {
        this.submitting = false;
        this.error = 'Could not save movie.';
        console.error(err);
      }
    });
  }

  reset() {
    this.form.reset({
      title: '',
      posterUrl: '',
      category: this.categoryOptions[0],
      rating: this.ratingOptions[0],
      description: '',
      releaseYear: new Date().getFullYear(),
      director: ''
    });
  }
}
