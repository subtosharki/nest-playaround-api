import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './signup.dto';
import { HashService } from '../hash/hash.service';

@Injectable()
export class SignupService {
  constructor(
    private prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  public async signup({ username, password, password2 }: SignupDto) {
    const usernames = await this.prisma.user.findMany({
      select: {
        username: true,
      },
    });
    usernames.forEach((user) => {
      if (user.username === username) {
        throw new BadRequestException('Username already exists');
      }
    });
    if (password !== password2) {
      throw new BadRequestException('Passwords do not match');
    }
    try {
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
