import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './login.dto';
import { compare } from 'bcrypt';
import type { User } from '@prisma/client';

@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaService) {}
  public async login({ username, password }: LoginDto): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (user && (await compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
