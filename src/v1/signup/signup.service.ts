import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './signup.dto';
import { ApikeyService } from '../apikey/apikey.service';

@Injectable()
export class SignupService {
  constructor(
    private prisma: PrismaService,
    private readonly APIkeyService: ApikeyService,
  ) {}

  public async signup({ username, password, generate_apikey }: SignupDto) {
    try {
      return await this.prisma.user.create({
        data: {
          username,
          password,
          apikey: generate_apikey
            ? await this.APIkeyService.generateAPIKey()
            : null,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
