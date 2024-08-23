import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUser, GetUsers, FindRole, BcryptPasswordHasher } from './services';
import { Role, User } from './entities';



@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController],
  providers: [CreateUser, UserService, GetUsers, FindRole, BcryptPasswordHasher],
  exports: [UserService]
})
export class UserModule { }