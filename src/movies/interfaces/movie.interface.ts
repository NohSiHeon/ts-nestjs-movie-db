import { MovieGenre } from '@prisma/client';

export interface Movie {
  id: number;
  userId: number;
  title: string;
  introduction: string;
  actors: string;
  rating: number;
  genre: MovieGenre;
  releaseYear: string;
  createdAt: Date;
  updatedAt: Date;
}
