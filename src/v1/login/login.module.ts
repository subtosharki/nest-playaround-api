import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UtilsService } from '../utils/utils.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../logger/logger.service';

@Module({
  providers: [LoginService, UtilsService, PrismaService, LoggerService],
  controllers: [LoginController],
})
export class LoginModule {}
