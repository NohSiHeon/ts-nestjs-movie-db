import { Score } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class RegisterReviewDto {
  @IsString()
  text: string;

  @IsEnum(Score)
  score: Score;
}
