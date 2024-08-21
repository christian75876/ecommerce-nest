import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersGateway } from './users.gateway';
import { UserController } from './user.controller';

@Module({
  providers: [UsersGateway, UsersService],
  controllers: [UserController],
})
export class UsersModule {}
