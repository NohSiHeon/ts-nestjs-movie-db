import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  // async findUserByEmail(email: string): Promise<string> {
  //   const user = await this.usersRepository.findUserByEmail(email);
  //   return user;
  // }
}
