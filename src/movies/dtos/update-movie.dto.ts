import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Genre } from '../enums/genre.enum';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  introduction: string;

  @IsOptional()
  @IsString()
  actors: string;

  @IsOptional()
  @IsEnum(Genre)
  genre: Genre;

  @IsOptional()
  @IsString()
  releaseYear: string;
}
