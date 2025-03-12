import { IsEnum, IsString } from 'class-validator';

export enum Genre {
  NONE = 'NONE',
  ACTION = 'ACTION',
  ADVENTURE = 'ADVENTURE',
  COMEDY = 'COMEDY',
  FANTASY = 'FANTASY',
  HORROR = 'HORROR',
  SF = 'SF',
  SPORTS = 'SPORTS',
  ANIMATION = 'ANIMATION',
  MYSTERY = 'MYSTERY',
  CRIME = 'CRIME',
}

export class RegisterMovieDto {
  @IsString()
  title: string;

  @IsString()
  introduction: string;

  @IsString()
  actors: string;

  @IsEnum(Genre)
  genre: Genre;

  @IsString()
  releaseYear: string;
}
