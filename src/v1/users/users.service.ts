import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserDto,
  DeleteUserDto,
  GetPasswordDto,
  GetUserDto,
  GetUsernameDto,
  UpdatePasswordDto,
  UpdateUsernameDto,
} from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private async generateApiKey() {
    return uuid();
  }
  public async getAllUsers() {
    return await this.prisma.user.findMany();
  }
  public async getUser(body: GetUserDto) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id: body.id,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async createUser(body: CreateUserDto) {
    const { username, password } = body;
    try {
      return await this.prisma.user.create({
        data: {
          username,
          password,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  public async deleteUser(body: DeleteUserDto) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: body.id,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async getUsername(body: GetUsernameDto) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id: body.id,
        },
        select: {
          username: true,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  public async getPassword(body: GetPasswordDto) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id: body.id,
        },
        select: {
          password: true,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async updateUsername(id: number, body: UpdateUsernameDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          username: body.username,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  public async updatePassword(id: number, body: UpdatePasswordDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          password: body.password,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async getAPIKey(id: number) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          apikey: true,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async createNewAPIKey(id: number) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          apikey: await this.generateApiKey(),
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
