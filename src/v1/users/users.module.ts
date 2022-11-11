import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { AdminService } from '../admin/admin.service';
import { UtilsService } from '../utils/utils.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    AuthService,
    AdminService,
    UtilsService,
  ],
})
export class UsersModule {
  constructor() {}
}
