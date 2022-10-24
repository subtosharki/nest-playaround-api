import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './login.dto';
import { HashService } from '../hash/hash.service';

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
  ) {}
  public async login({ username, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (
      user &&
      (await this.hashService.comparePassword(password, user.password))
    )
      return user;
    throw new UnauthorizedException();
  }
}
