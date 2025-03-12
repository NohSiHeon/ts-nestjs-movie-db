import { Body, Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // async findUserByEmail(@Body() email: string): Promise<User> {
  //   const data = await this.usersService.findUserByEmail(email);
  //   return data;
  // }
}
