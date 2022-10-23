import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ApikeyService } from '../apikey/apikey.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ApikeyService],
})
export class UsersModule {
  constructor() {}
}
