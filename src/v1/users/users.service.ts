import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePasswordDto, UpdateUsernameDto } from './users.dto';
import {
  AlreadyInUseException,
  InvalidPropertyException,
  UserNotFoundException,
} from '../exceptions/users.exception';
import { compare, genSalt, hash as genHash } from 'bcrypt';
import type {
  ListOfUsersData,
  UpdatePasswordReturnData,
  UpdateUsernameReturnData,
  UsernameReturnData,
  UserReturnData,
} from '../types/types';
import { InUseTypes, PropertyTypes } from '../types/types';

@Injectable()
export class UsersService {
  public constructor(private readonly prisma: PrismaService) {}
  public async getAllUsers(): Promise<ListOfUsersData> {
    return await this.prisma.user.findMany();
  }
  public async getUser(id: number): Promise<UserReturnData> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
  public async deleteUser(id: number): Promise<UserReturnData> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
  public async getUsername(id: number): Promise<UsernameReturnData> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        username: true,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user.username;
  }
  public async updateUsername(
    id: number,
    { username, password }: UpdateUsernameDto,
  ): Promise<UpdateUsernameReturnData> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        username: true,
        password: true,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    if (user.username === username) {
      throw new AlreadyInUseException(InUseTypes.USERNAME);
    }
    if (!(await compare(password, user.password))) {
      throw new InvalidPropertyException(PropertyTypes.CONFIRMATION_PASSWORD);
    }
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
      },
    });
  }
  public async updatePassword(
    id: number,
    { newPassword, oldPassword, confirmationPassword }: UpdatePasswordDto,
  ): Promise<UpdatePasswordReturnData> {
    if (newPassword !== confirmationPassword) {
      throw new InvalidPropertyException(PropertyTypes.CONFIRMATION_PASSWORD);
    }
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    if (
      !(await compare(
        await genHash(user.password, await genSalt()),
        oldPassword,
      ))
    ) {
      throw new InvalidPropertyException(PropertyTypes.OLD_PASSWORD);
    }
    if (
      await compare(
        await genHash(user.password, await genSalt()),
        user.password,
      )
    ) {
      throw new AlreadyInUseException(InUseTypes.PASSWORD);
    }
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: await genHash(user.password, await genSalt()),
      },
    });
  }
}
