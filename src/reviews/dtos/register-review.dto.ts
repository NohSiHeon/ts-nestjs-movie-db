import { Score } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class RegisterReviewDto {
  @IsNumber()
  movieId: number;

  @IsString()
  text: string;

  @IsEnum(Score)
  score: Score;
}
