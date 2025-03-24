import { Score } from '@prisma/client';

export interface Review {
  id: number;
  userId: number;
  movieId: number;
  score: Score;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
