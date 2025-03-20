import { BaseResponse } from 'src/common/interfaces/base-response.interface';
import { Movie } from './movie.interface';

export interface GetMovieResponse extends BaseResponse {
  data: Movie;
}
