import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserIdDto } from '../users/users.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApikeyService {
  constructor(private prisma: PrismaService) {}
  public async generateAPIKey() {
    try {
      return uuid();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  public async getAPIKey({ id }: UserIdDto) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          apikey: true,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async getNewAPIKey({ id }: UserIdDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          apikey: await this.generateAPIKey(),
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
