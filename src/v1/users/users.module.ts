import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../hash/hash.service';
import { AuthService } from '../auth/auth.service';
import { AdminService } from '../admin/admin.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    HashService,
    AuthService,
    AdminService,
  ],
})
export class UsersModule {
  constructor() {}
}
