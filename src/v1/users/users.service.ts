import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePasswordDto, UpdateUsernameDto } from './users.dto';
import { HashService } from '../hash/hash.service';
import {
  InvalidOldPasswordException,
  PasswordAlreadyInUseException,
  UsernameAlreadyInUseException,
  UserNotFoundException,
} from '../exceptions/users.exception';

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
      throw new UserNotFoundException();
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
      throw new UserNotFoundException();
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
      throw new UserNotFoundException();
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
      throw new UsernameAlreadyInUseException();
    }
  }
  public async updatePassword(
    id: number,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ) {
    try {
      const { password } = await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          password: true,
        },
      });
      if (
        !(await this.hashService.compare(
          await this.hashService.hash(oldPassword),
          password,
        ))
      ) {
        throw new InvalidOldPasswordException();
      }
      if (
        await this.hashService.compare(
          await this.hashService.hash(newPassword),
          password,
        )
      ) {
        throw new PasswordAlreadyInUseException();
      }

      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          password: await this.hashService.hash(newPassword),
        },
      });
    } catch (e) {
      throw new UserNotFoundException();
    }
  }
}
