import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserRole } from 'src/users/enums/user-role.enum';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const role = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!role) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return this.validateUser(user, role);
  }

  private async validateUser(user: any, role: UserRole[]): Promise<boolean> {
    if (!role.includes(user.role)) {
      throw new UnauthorizedException('접근할 권한이 없습니다.');
    }
    return true;
  }
}
