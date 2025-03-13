import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { SignUp } from './interfaces/sign-up.interface';
import { UsersRepository } from 'src/users/users.repository';
import { SignInDto } from './dtos/sign-in.dto';

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
      throw new ConflictException('이미 가입한 이메일입니다.');
    }

    if (password !== passwordConfirm) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await this.authRepository.signUp(name, email, hashedPassword);

    return data;
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const checkEmail = await this.usersRepository.findUserEmailByEmail(email);

    if (!checkEmail) {
      throw new UnauthorizedException(
        '이메일 혹은 비밀번호를 잘못 입력했거나 등록되지 않은 계정입니다',
      );
    }

    return true;
  }
}
