import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUser, GetUsers, FindRole } from './services';
import { User } from './entities';
import { CreateUserDto } from './dto';


@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getUsers: GetUsers,
    private readonly findRole: FindRole,
  ) {};

  async create(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.findRole.getRole(createUserDto.roleId);
    if(!role){
      throw new NotFoundException('Role not found');
    }
    return await this.createUser.saveUser(createUserDto);
  }

  async getAll(): Promise<User[]> {
    return await this.getUsers.getAllUsers();
  }

  async getById(id: number): Promise<User> {
    return await this.getUsers.getUser(id);
  };
}