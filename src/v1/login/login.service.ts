import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './login.dto';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}
  public async login({ username, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user && user.password === password) return user;
    throw new UnauthorizedException();
  }
}
