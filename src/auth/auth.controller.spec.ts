import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { BadRequestException } from '@nestjs/common';
import { IUser } from 'src/user/interfaces/user.interface';
import { IAuth } from './interface/auth.interface';
import { mockUser } from 'src/user/mock/user.mock';
import { mockAuth } from './mock/auth.mock';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  const mockAuthService = {
    authenticate: jest.fn(),
    singup: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('authenticate', () => {
    it('should call authService.authenticate and return a token', async () => {
      const user: IUser = mockUser;
      const result: IAuth = mockAuth;
      mockAuthService.authenticate.mockResolvedValue(result);

      expect(await authController.authenticate(user)).toEqual(result);
      expect(mockAuthService.authenticate).toHaveBeenCalledWith(user);
    });

    it('should throw BadRequestException when authentication fails', async () => {
      const user: IUser = { username: 'test', password: 'wrong' };
      mockAuthService.authenticate.mockRejectedValue(
        new BadRequestException('User invalid!'),
      );

      try {
        await authController.authenticate(user);
      } catch (e) {
        expect(e.response.message).toBe('User invalid!');
      }
    });
  });

  describe('singup', () => {
    it('should call authService.singup and return a user', async () => {
      mockAuthService.singup.mockResolvedValue(mockUser);

      expect(await authController.singup(mockUser)).toEqual(mockUser);
      expect(mockAuthService.singup).toHaveBeenCalledWith(mockUser);
    });
  });
});
