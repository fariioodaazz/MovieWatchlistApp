export interface Movie {
  id: number;
  title: string;
  posterUrl: string;      // e.g. 'assets/posters/inception.jpg'
  description: string;
  releaseYear: number;
  director: string;
  rating: number;         // 0–10
  category: string;       // e.g. 'SCI_FI', 'Drama'
}
