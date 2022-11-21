import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePasswordDto, UpdateUsernameDto } from './users.dto';
import { compare, genSalt, hash as genHash } from 'bcrypt';
import type {
  ListOfUsersData,
  UpdatePasswordReturnData,
  UpdateUsernameReturnData,
  UsernameReturnData,
  UserReturnData,
} from '../types';
import { ERROR_MESSAGES } from '../types';

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
      throw new HttpException(
        ERROR_MESSAGES.NOT_FOUND.USER,
        HttpStatus.NOT_FOUND,
      );
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
      throw new HttpException(
        ERROR_MESSAGES.NOT_FOUND.USER,
        HttpStatus.NOT_FOUND,
      );
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
      throw new HttpException(
        ERROR_MESSAGES.NOT_FOUND.USER,
        HttpStatus.NOT_FOUND,
      );
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
      throw new HttpException(
        ERROR_MESSAGES.NOT_FOUND.USER,
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.username === username) {
      throw new HttpException(
        ERROR_MESSAGES.ALREADY_EXISTS.USERNAME,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await compare(password, user.password))) {
      throw new HttpException(
        ERROR_MESSAGES.INVALID.CONFIRMATION_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException(
        ERROR_MESSAGES.INVALID.CONFIRMATION_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException(ERROR_MESSAGES.NOT_FOUND.USER, 404);
    }
    const [oldPasswordMatches, newPasswordIsInUse, hashedPassword] =
      await Promise.all([
        compare(oldPassword, user.password),
        compare(newPassword, user.password),
        genHash(newPassword, await genSalt()),
      ]);
    if (!oldPasswordMatches) {
      throw new HttpException(
        ERROR_MESSAGES.INVALID.OLD_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (newPasswordIsInUse) {
      throw new HttpException(
        ERROR_MESSAGES.IN_USE.PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
  }
}
