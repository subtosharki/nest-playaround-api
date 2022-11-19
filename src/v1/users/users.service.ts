import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePasswordDto, UpdateUsernameDto } from './users.dto';
import {
  AlreadyInUseException,
  InUseTypes,
  InvalidPropertyException,
  PropertyTypes,
  UserNotFoundException,
} from '../exceptions/users.exception';
import { compare, genSalt, hash as genHash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
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
      throw new AlreadyInUseException(InUseTypes.USERNAME);
    }
  }
  public async updatePassword(
    id: number,
    { newPassword, oldPassword, confirmationPassword }: UpdatePasswordDto,
  ) {
    if (newPassword !== confirmationPassword) {
      throw new InvalidPropertyException(PropertyTypes.CONFIRMATION_PASSWORD);
    }
    const { password } = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });
    if (
      !(await compare(await genHash(password, await genSalt()), oldPassword))
    ) {
      throw new InvalidPropertyException(PropertyTypes.OLD_PASSWORD);
    }
    if (!(await compare(await genHash(password, await genSalt()), password))) {
      throw new AlreadyInUseException(InUseTypes.PASSWORD);
    }

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: await genHash(password, await genSalt()),
      },
    });
  }
}
