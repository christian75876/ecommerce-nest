import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateToken, LoginService, MatchPassword, UserValidator } from './services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (ConfigService: ConfigService) => ({
      secret: ConfigService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '1h' },
    }),
  }),
  ConfigModule.forRoot(),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, LoginService, GenerateToken, UserValidator, MatchPassword, JwtStrategy],
})
export class AuthModule { }
