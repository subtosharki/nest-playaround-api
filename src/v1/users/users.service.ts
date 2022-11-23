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
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class UsersService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly utilService: UtilsService,
  ) {}
  public async getAllUsers(): Promise<ListOfUsersData> {
    return await this.prisma.user.findMany();
  }
  public async getUser(id: number): Promise<UserReturnData> {
    return await this.utilService.getUserById(id);
  }
  public async deleteUser(id: number): Promise<UserReturnData> {
    await this.utilService.getUserById(id);
    return await this.utilService.deleteUserById(id);
  }
  public async getUsername(id: number): Promise<UsernameReturnData> {
    const user = await this.utilService.getUserById(id);
    return user.username;
  }
  public async updateUsername(
    id: number,
    { username, password }: UpdateUsernameDto,
  ): Promise<UpdateUsernameReturnData> {
    const user = await this.utilService.getUserById(id);
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
    const user = await this.utilService.getUserById(id);
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
