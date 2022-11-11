import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { genSalt, hash as genHash, compare } from 'bcrypt';
import { UserNotFoundException } from '../exceptions/users.exception';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UtilsService {
  constructor(private prisma: PrismaService) {}
  public async getNewAPIKey(id: number) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          apikey: uuid(),
        },
      });
    } catch (e) {
      throw new UserNotFoundException();
    }
  }
  public async hash(val: string) {
    try {
      return await genHash(val, await genSalt());
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  public async compare(val: string, hash: string) {
    try {
      return await compare(val, hash);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
