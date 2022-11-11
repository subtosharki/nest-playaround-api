import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './v1/users/users.module';
import compression from 'compression';
import { PrismaService } from './v1/prisma/prisma.service';
import { PrismaModule } from './v1/prisma/prisma.module';
import { LoginModule } from './v1/login/login.module';
import { SignupModule } from './v1/signup/signup.module';
import { ApikeyModule } from './v1/apikey/apikey.module';
import { AdminModule } from './v1/admin/admin.module';
import { AuthModule } from './v1/auth/auth.module';
import { UtilsModule } from './v1/utils/utils.module';
import helmet from 'helmet';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    LoginModule,
    SignupModule,
    ApikeyModule,
    AdminModule,
    AuthModule,
    UtilsModule,
  ],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(compression, helmet()).forRoutes('*');
  }
}
