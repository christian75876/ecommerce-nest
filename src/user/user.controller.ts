import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';




@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  };

  @Get()
  findAll() {
    return this.userService.getAll();
  };

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.userService.getById(id);
  }
}