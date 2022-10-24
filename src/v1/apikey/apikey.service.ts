import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserIdDto } from '../users/users.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../hash/hash.service';

@Injectable()
export class ApikeyService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
  ) {}
  public async generateAPIKey() {
    try {
      return this.hashService.hash(uuid());
    } catch (e) {
      throw new InternalServerErrorException(e);
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
