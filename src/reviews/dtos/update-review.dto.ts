import { PartialType } from '@nestjs/mapped-types';
import { RegisterReviewDto } from './register-review.dto';

export class UpdateReviewDto extends PartialType(RegisterReviewDto) {}
