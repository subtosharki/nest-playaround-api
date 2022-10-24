import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  DeleteUserDto,
  GetPasswordDto,
  GetUserDto,
  GetUsernameDto,
  UpdatePasswordDto,
  UpdateUsernameDto,
  UserIdDto,
} from './users.dto';
import { ApikeyService } from '../apikey/apikey.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly APIkeyService: ApikeyService,
  ) {}
  public async getAllUsers() {
    return await this.prisma.user.findMany();
  }
  public async getUser({ id }: GetUserDto) {
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
  public async deleteUser({ id }: DeleteUserDto) {
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
  public async getUsername({ id }: GetUsernameDto) {
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

  public async getPassword({ id }: GetPasswordDto) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          password: true,
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
          password,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
