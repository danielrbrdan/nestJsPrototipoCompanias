import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { IAuth } from './interface/auth.interface';
import { JWT_SECRET } from 'src/config/enviroment';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(user: IUser): Promise<IAuth> {
    const userFound = await this.userService.findOneByUsernameAndPassword(
      user.username,
      user.password,
    );

    if (!userFound) {
      throw new BadRequestException('User invalid!');
    }

    const tokenPayload = {
      sub: userFound.id,
      username: userFound.username,
    };

    const token = await this.jwtService.signAsync(tokenPayload, {
      secret: JWT_SECRET,
    });

    return {
      ...tokenPayload,
      token,
    };
  }

  singup(input: IUser): Promise<IUser> {
    return this.userService.create(input);
  }
}
