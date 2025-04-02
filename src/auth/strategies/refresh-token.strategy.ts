import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from '../interfaces/payload.interface';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh',
) {
  constructor(
    private configService: ConfigService,
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET_KEY'),
    });
  }

  async validate(payload: Payload) {
    const { id, email } = payload;
    const user = await this.usersRepository.findUserByIdAndEmail(id, email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
