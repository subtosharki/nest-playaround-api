import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './signup.dto';
import {
  PasswordsDoNotMatchException,
  UsernameAlreadyExistsException,
} from '../exceptions/signup.exception';
import { genSalt, hash as genHash } from 'bcrypt';
import type { User } from '@prisma/client';

@Injectable()
export class SignupService {
  constructor(private readonly prisma: PrismaService) {}

  public async signup({
    username,
    password,
    password2,
  }: SignupDto): Promise<User> {
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
        password: await genHash(password, await genSalt()),
      },
    });
  }
}
