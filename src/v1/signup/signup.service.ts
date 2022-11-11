import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './signup.dto';
import { HashService } from '../hash/hash.service';
import {
  PasswordsDoNotMatchException,
  UsernameAlreadyExistsException,
} from '../exceptions/signup.exception';

@Injectable()
export class SignupService {
  constructor(
    private prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  public async signup({ username, password, password2 }: SignupDto) {
    try {
      const usernames = await this.prisma.user.findMany({
        select: {
          username: true,
        },
      });
      usernames.forEach((user) => {
        if (user.username === username) {
          throw new UsernameAlreadyExistsException();
        }
      });
      if (password !== password2) {
        throw new PasswordsDoNotMatchException();
      }

      return await this.prisma.user.create({
        data: {
          username,
          password: await this.hashService.hash(password),
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
