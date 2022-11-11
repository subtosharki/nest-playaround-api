import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { SignupDto } from './signup.dto';
import {
  PasswordsDoNotMatchException,
  UsernameAlreadyExistsException,
} from '../exceptions/signup.exception';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class SignupService {
  constructor(
    private prisma: PrismaService,
    private readonly utilsService: UtilsService,
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
          password: await this.utilsService.hash(password),
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
