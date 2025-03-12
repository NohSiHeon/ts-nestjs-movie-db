import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpSuccessResponseDto } from './dtos/sign-up-success-response.dto';
import { SignUpFailResponseDto } from './dtos/sign-up-fail-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<SignUpSuccessResponseDto | SignUpFailResponseDto> {
    try {
      const data = await this.authService.signUp(signUpDto);

      return {
        status: HttpStatus.CREATED,
        message: '회원가입 성공',
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          message: error.response,
        },
        error.status,
        {
          cause: error,
        },
      );
    }
  }
}
