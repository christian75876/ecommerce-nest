import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './common/config/connection-db.config';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
