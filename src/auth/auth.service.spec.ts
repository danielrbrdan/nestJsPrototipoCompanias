import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import { mockUser } from 'src/user/mock/user.mock';
import { mockAuth } from './mock/auth.mock';
import { JWT_SECRET } from 'src/config/enviroment';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    userService = {
      findOneByUsername: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('fakeToken'),
    } as unknown as jest.Mocked<JwtService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('authenticate', () => {
    it('should return a token when user is valid', async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      userService.findOneByUsername.mockResolvedValue(mockUser);

      const result = await service.authenticate(mockUser);

      expect(result).toEqual(mockAuth);
      expect(userService.findOneByUsername).toHaveBeenCalledWith(
        mockUser.username,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockUser.password,
        mockUser.password,
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        { sub: mockUser.id, username: mockUser.username },
        { secret: JWT_SECRET },
      );
    });

    it('should throw BadRequestException if user is not found', async () => {
      userService.findOneByUsername.mockResolvedValue(null);

      await expect(service.authenticate(mockUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if password is invalid', async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      userService.findOneByUsername.mockResolvedValue(mockUser);

      await expect(service.authenticate(mockUser)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('singup', () => {
    it('should create a new user', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

      userService.create.mockResolvedValue(mockUser);

      const result = await service.singup({ ...mockUser });

      expect(result).toEqual(mockUser);
      expect(userService.create).toHaveBeenCalledWith({
        ...mockUser,
        password: 'hashedPassword',
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);
    });
  });
});
