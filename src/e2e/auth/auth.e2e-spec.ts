import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { HttpCode, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { User } from 'src/user/entity/user.entity';
import { mockUser } from 'src/user/mock/user.mock';
import { JWT_SECRET } from 'src/config/enviroment';
import { testTypeOrmModuleOptions } from '../test-orm';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testTypeOrmModuleOptions),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
          secret: JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, UserService],
    }).compile();

    app = moduleFixture.createNestApplication();
    dataSource = moduleFixture.get(DataSource);

    await app.init();
  });

  afterEach(async () => {
    await dataSource.getRepository(User).clear();
  });

  describe('/auth/login (POST)', () => {
    it('should return a token for valid user', async () => {
      await dataSource.getRepository(User).save(mockUser);

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(mockUser)
        .expect(HttpStatus.CREATED)
        .then((response) => {
          expect(response.body).toHaveProperty('token');
          expect(response.body.username).toBe(mockUser.username);
        });
    });

    it('should return BadRequestException for not found user', async () => {
      const invalidUser = {
        username: 'invalidUsername',
        password: 'wrongPassword',
      };

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(invalidUser)
        .expect(HttpStatus.BAD_REQUEST)
        .then((response) => {
          expect(response.body.message).toBe('User invalid!');
        });
    });
  });

  it('/auth/singup (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/singup')
      .send(mockUser)
      .expect(HttpStatus.CREATED);

    const created = await dataSource
      .getRepository(User)
      .findOneBy({ id: response.body.id });

    expect(created).toEqual({ ...mockUser, id: expect.any(Number) });
  });

  afterAll(async () => {
    await app.close();
  });
});
