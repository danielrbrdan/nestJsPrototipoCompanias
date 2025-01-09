import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  const mockJwtService = {
    verifyAsync: jest.fn().mockResolvedValue({ sub: 1 }),
  };

  const mockExecutionContext = {
    switchToHttp: jest.fn().mockReturnThis(),
    getRequest: jest.fn().mockReturnValue({
      headers: {
        authorization: 'Bearer valid_token',
      },
      url: '/some/other/route',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, { provide: JwtService, useValue: mockJwtService }],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true for allowed routes', async () => {
      mockExecutionContext.getRequest.mockReturnValueOnce({
        headers: {},
        url: '/auth/login',
      });

      const result = await authGuard.canActivate(
        mockExecutionContext as unknown as ExecutionContext,
      );
      expect(result).toBe(true);
    });

    it('should return true if token is valid', async () => {
      mockExecutionContext.getRequest.mockReturnValueOnce({
        headers: { authorization: 'Bearer valid_token' },
        url: '/some/other/route',
      });

      const result = await authGuard.canActivate(
        mockExecutionContext as unknown as ExecutionContext,
      );
      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException if no token is provided', async () => {
      mockExecutionContext.getRequest.mockReturnValueOnce({
        headers: {},
        url: '/some/other/route',
      });

      await expect(
        authGuard.canActivate(
          mockExecutionContext as unknown as ExecutionContext,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      mockExecutionContext.getRequest.mockReturnValueOnce({
        headers: { authorization: 'Bearer invalid_token' },
        url: '/some/other/route',
      });

      (mockJwtService.verifyAsync as jest.Mock).mockRejectedValueOnce(
        new Error('Invalid token'),
      );

      await expect(
        authGuard.canActivate(
          mockExecutionContext as unknown as ExecutionContext,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
