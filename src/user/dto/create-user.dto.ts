import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";


export class CreateUserDto {

  @IsNotEmpty({ message: 'The email is required' })
  @IsString({ message: 'The email must be a string' })
  @IsEmail({}, { message: 'The email is not valid' })
  email: string;

  @IsNotEmpty({ message: 'The password is required' })
  @IsString({ message: 'The password must be a string' })
  password: string;

  @IsNotEmpty({ message: 'The role is required' })
  @IsNumber({}, { message: 'The role is required' })
  roleId: number
}