import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user@@', user);

    return this.validateUser(user);
  }

  private async validateUser(user: Omit<User, 'password'>): Promise<boolean> {
    if (!user && user.role !== 'ADMIN') {
      throw new UnauthorizedException('접근할 권한이 없습니다.');
    }
    return true;
  }
}
