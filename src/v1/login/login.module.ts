import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../utils/utils.service';

@Module({
  providers: [LoginService, PrismaService, UtilsService],
  controllers: [LoginController],
})
export class LoginModule {}
