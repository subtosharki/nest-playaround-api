import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePasswordBody, UpdateUsernameBody } from './users.dto';
import { compare, genSalt, hash as genHash } from 'bcrypt';
import {
  type ListOfUsersData,
  type UpdatePasswordReturnData,
  type UpdateUsernameReturnData,
  type UsernameReturnData,
  type UserReturnData,
  ErrorMessages,
  LogType,
} from '../types';
import { UtilsService } from '../utils/utils.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UsersService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly utilService: UtilsService,
    private readonly loggerService: LoggerService,
  ) {}
  public async getAllUsers(): Promise<ListOfUsersData> {
    return await this.prisma.user.findMany();
  }
  public async getUser(id: number): Promise<UserReturnData> {
    return await this.utilService.getUserById(id);
  }
  public async deleteUser(id: number): Promise<UserReturnData> {
    await this.utilService.getUserById(id);
    const user = await this.utilService.deleteUserById(id);
    this.loggerService.emit(LogType.USER_DELETED, user);
    return user;
  }
  public async getUsername(id: number): Promise<UsernameReturnData> {
    const user = await this.utilService.getUserById(id);
    return user.username;
  }
  public async updateUsername(
    id: number,
    { username, password }: UpdateUsernameBody,
  ): Promise<UpdateUsernameReturnData> {
    const user = await this.utilService.getUserById(id);
    if (user.username === username) {
      throw new HttpException(
        ErrorMessages.USERNAME_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await compare(password, user.password))) {
      throw new HttpException(
        ErrorMessages.INVALID_CONFIRMATION_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
      },
    });
    this.loggerService.emit(LogType.USER_UPDATED, updatedUser);
    return user;
  }
  public async updatePassword(
    id: number,
    { newPassword, oldPassword, confirmationPassword }: UpdatePasswordBody,
  ): Promise<UpdatePasswordReturnData> {
    if (newPassword !== confirmationPassword) {
      throw new HttpException(
        ErrorMessages.INVALID_CONFIRMATION_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.utilService.getUserById(id);
    const [oldPasswordMatches, newPasswordIsInUse, hashedPassword] =
      await Promise.all([
        compare(oldPassword, user.password),
        compare(newPassword, user.password),
        genHash(newPassword, await genSalt()),
      ]);
    if (!oldPasswordMatches) {
      throw new HttpException(
        ErrorMessages.INVALID_OLD_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (newPasswordIsInUse) {
      throw new HttpException(
        ErrorMessages.PASSWORD_IN_USE,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    this.loggerService.emit(LogType.USER_UPDATED, updatedUser);
    return updatedUser;
  }
}
