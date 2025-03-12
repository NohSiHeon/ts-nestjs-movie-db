import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { SignUp } from './interfaces/sign-up.interface';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async signUp(signUpDto: SignUp) {
    const { name, email, password, passwordConfirm } = signUpDto;
    const checkEmail = await this.usersRepository.findUserEmailByEmail(email);

    if (checkEmail) {
      throw new HttpException('이미 가입한 이메일입니다.', HttpStatus.CONFLICT);
    }

    if (password !== passwordConfirm) {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await this.authRepository.signUp(name, email, hashedPassword);

    return data;
  }
}
