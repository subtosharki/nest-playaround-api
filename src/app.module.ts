import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './v1/users/users.module';
import { AuthMiddleware } from './v1/auth/auth.middleware';
import { UsersController } from './v1/users/users.controller';
import { AuthModule } from './v1/auth/auth.module';
import compression from 'compression';
import { PrismaService } from './v1/prisma/prisma.service';
import { PrismaModule } from './v1/prisma/prisma.module';
import { LoginModule } from './v1/login/login.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, LoginModule],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, compression).forRoutes(UsersController);
  }
}
