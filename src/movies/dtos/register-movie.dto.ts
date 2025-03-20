import { IsEnum, IsString } from 'class-validator';
import { Genre } from '../enums/genre.enum';
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
