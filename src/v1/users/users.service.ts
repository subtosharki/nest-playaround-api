import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePasswordDto, UpdateUsernameDto, UserIdDto } from './users.dto';
import { ApikeyService } from '../apikey/apikey.service';
import { HashService } from '../hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly APIkeyService: ApikeyService,
    private readonly hashService: HashService,
  ) {}
  public async getAllUsers() {
    return await this.prisma.user.findMany();
  }
  public async getUser({ id }: UserIdDto) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async deleteUser({ id }: UserIdDto) {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async getUsername({ id }: UserIdDto) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          username: true,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async updateUsername(
    { id }: UserIdDto,
    { username }: UpdateUsernameDto,
  ) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          username,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async updatePassword(
    { id }: UserIdDto,
    { password }: UpdatePasswordDto,
  ) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          password: await this.hashService.hash(password),
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
