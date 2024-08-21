import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './common/config/connection-db.config';
import { DatabaseModule } from './modules/database.module';
import { UsersModule } from './user/users.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
