import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthenticationGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
