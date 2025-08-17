import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  description: string;
  releaseYear: number;
  director: string;
  rating: number;
  category: string;
}


const NO_IMAGE = 'https://placehold.co/400x600?text=No+Image';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'The Matrix',
      posterUrl: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg',
      description: `A groundbreaking sci-fi classic that questions the very fabric of reality. 
      Thomas Anderson, a computer hacker known as Neo, discovers that the world he lives in is nothing more than an elaborate simulation controlled by machines. 
      As he joins a band of rebels led by Morpheus and the enigmatic Trinity, Neo begins to unlock powers he never imagined, forcing him to choose between illusion and truth. 
      The film blends martial arts action, philosophy, and cyberpunk style, making it one of the most influential movies in modern cinema.`,
      releaseYear: 1999,
      director: 'The Wachowskis',
      rating: 8.7,
      category: 'SCI_FI'
    },
    {
      id: 2,
      title: 'Inception',
      posterUrl: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg',
      description: `A mind-bending thriller that dives into the architecture of dreams. 
      Dom Cobb, a skilled thief, is an expert at extracting secrets from the subconscious during sleep. 
      Offered a chance to redeem his past crimes, he must do the impossible: plant an idea inside someone’s mind, a dangerous act known as “inception.” 
      With layers of dreams collapsing into each other, Cobb and his team face shifting realities, breathtaking visuals, and the haunting weight of his personal tragedy. 
      The film is a masterclass in suspense, visuals, and emotional storytelling.`,
      releaseYear: 2010,
      director: 'Christopher Nolan',
      rating: 8.8,
      category: 'SCI_FI'
    },
    {
      id: 3,
      title: 'Dune: Part Two',
      posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      description: `The epic continuation of Frank Herbert’s legendary saga. 
      Paul Atreides embraces his destiny as he allies with the Fremen, mastering the harsh desert planet of Arrakis and preparing for war against House Harkonnen. 
      Torn between love, prophecy, and vengeance, Paul struggles with the heavy burden of becoming the messiah foretold in legend. 
      With breathtaking visuals, monumental battles, and deep philosophical questions, the film explores themes of power, faith, and survival. 
      It’s an unforgettable journey into the heart of science fiction.`,
      releaseYear: 2024,
      director: 'Denis Villeneuve',
      rating: 8.6,
      category: 'SCI_FI'
    },
    {
      id: 4,
      title: 'Oppenheimer',
      posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      description: `A sweeping historical drama chronicling the life of J. Robert Oppenheimer, the brilliant yet tormented scientist behind the creation of the atomic bomb. 
      As World War II rages, Oppenheimer’s groundbreaking work in the Manhattan Project changes the course of history forever. 
      The film doesn’t just focus on the science, but delves into the moral conflicts and devastating consequences of wielding such destructive power. 
      With tense political intrigue, breathtaking visuals, and Nolan’s signature storytelling, the movie captures both the triumph and the tragedy of one of humanity’s most pivotal moments.`,
      releaseYear: 2023,
      director: 'Christopher Nolan',
      rating: 8.9,
      category: 'BIOGRAPHY'
    }
  ];

  getAll(): Observable<Movie[]> {
    return of(this.movies.map(m => ({ ...m, posterUrl: m.posterUrl || NO_IMAGE })));
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    const m = this.movies.find(x => x.id === id);
    return of(m ? { ...m, posterUrl: m.posterUrl || NO_IMAGE } : undefined);
  }
}
