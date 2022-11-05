import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePasswordDto, UpdateUsernameDto } from './users.dto';
import { HashService } from '../hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}
  public async getAllUsers() {
    return await this.prisma.user.findMany();
  }
  public async getUser(id: number) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async deleteUser(id: number) {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      console.log(e);
      throw new NotFoundException();
    }
  }
  public async getUsername(id: number) {
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
  public async updateUsername(id: number, { username }: UpdateUsernameDto) {
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
  public async updatePassword(id: number, { password }: UpdatePasswordDto) {
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
