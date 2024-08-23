import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';


@Injectable()
export class GetUsers{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){};
  async getAllUsers(): Promise<User[]>{
    const users = await this.userRepository.find();
    console.log(users)
    return users
  }
  async getUser(id: number): Promise<User>{
    const user = await this.userRepository.findOne({where:{id}});
    return user;
  }  
}