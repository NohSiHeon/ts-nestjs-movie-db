import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { User } from './interfaces/user.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from './enums/user-role.enum';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Get('profile')
  async getProfile(@Request() req: any): Promise<Omit<User, 'password'>> {
    return req.user;
  }
}
