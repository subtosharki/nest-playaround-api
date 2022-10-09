import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './v1/users/users.module';
import { AuthMiddleware } from './v1/auth/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './v1/users/users.controller';
import { AuthModule } from './v1/auth/auth.module';
import compression from 'compression';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(process.env.DB), AuthModule],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, compression).forRoutes(UsersController);
  }
}
