import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './signup.dto';
import { ApikeyService } from '../apikey/apikey.service';
import { HashService } from '../hash/hash.service';

@Injectable()
export class SignupService {
  constructor(
    private prisma: PrismaService,
    private readonly APIkeyService: ApikeyService,
    private readonly hashService: HashService,
  ) {}

  public async signup({ username, password }: SignupDto) {
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
    try {
      return await this.prisma.user.create({
        data: {
          username,
          password: await this.hashService.hashPassword(password),
          apikey: await this.APIkeyService.generateAPIKey(),
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
