import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto';
import { BcryptPasswordHasher } from './hash-password.service';



@Injectable()
export class CreateUser {
  constructor(
    @InjectRepository(User)private userRepository: Repository<User>,
    private readonly cyrptPassword: BcryptPasswordHasher
  ) {};
  async saveUser(userData: CreateUserDto): Promise<User>{
    const password = userData.password;
    userData.password  = await this.cyrptPassword.hash(password, 10);
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }
};