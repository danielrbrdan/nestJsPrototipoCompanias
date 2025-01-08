import { Body, Controller, Post } from '@nestjs/common';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { IAuth } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  authenticate(@Body() input: IUser): Promise<IAuth> {
    return this.authService.authenticate(input);
  }

  @Post('singup')
  singup(@Body() input: IUser): Promise<IUser> {
    return this.authService.singup(input);
  }
}
