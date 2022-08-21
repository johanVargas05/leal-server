import { Controller, Post, Get, Body} from '@nestjs/common';

import { GetUser } from './decorators';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/auth.entity';

import { Auth } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(LoginUserDto);
  }

  @Get('refresh-token')
  @Auth()
  refreshToken(
    @GetUser() user:User) {
      return this.authService.refreshToken(user);
  }

}
