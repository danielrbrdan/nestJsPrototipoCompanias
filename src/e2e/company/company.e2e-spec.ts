import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { HttpCode, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CompanyController } from 'src/company/company.controller';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entity/company.entity';
import { mockCompany } from 'src/company/mock/company.mock';
import { Address } from 'src/address/entity/adress.entity';
import { testTypeOrmModuleOptions } from '../test-orm';

describe('CompanyController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testTypeOrmModuleOptions),
        TypeOrmModule.forFeature([Company, Address]),
      ],
      controllers: [CompanyController],
      providers: [CompanyService],
    }).compile();

    app = moduleFixture.createNestApplication();
    dataSource = moduleFixture.get(DataSource);

    await app.init();
  });

  afterEach(async () => {
    await dataSource.getRepository(Company).clear();
  });

  it('/company (POST)', async () => {
    return request(app.getHttpServer())
      .post('/company')
      .send(mockCompany)
      .expect(HttpStatus.CREATED)
      .then(async (response) => {
        const created = await dataSource.getRepository(Company).findOne({
          where: { id: response.body.id },
          relations: ['address'],
        });

        expect(created).toEqual({
          ...mockCompany,
          id: expect.any(Number),
          address: { ...mockCompany.address, id: expect.any(Number) },
        });
      });
  });

  it('/company (GET)', async () => {
    await dataSource.getRepository(Company).save(mockCompany);

    return request(app.getHttpServer())
      .get('/company')
      .expect(HttpStatus.OK)
      .then((response) => {
        expect(response.body).toHaveLength(1);
      });
  });

  it('/company/:id (GET)', async () => {
    const createdCompany = await dataSource
      .getRepository(Company)
      .save(mockCompany);
    return request(app.getHttpServer())
      .get(`/company/${createdCompany.id}`)
      .expect(HttpStatus.OK)
      .then((response) => {
        expect(response.body.id).toEqual(createdCompany.id);
      });
  });

  it('/company/:id (PUT)', async () => {
    const createdCompany = await dataSource
      .getRepository(Company)
      .save(mockCompany);
    const updatedCompany = {
      ...mockCompany,
      name: 'Updated Company',
    };

    return request(app.getHttpServer())
      .put(`/company/${createdCompany.id}`)
      .send(updatedCompany)
      .expect(HttpStatus.OK)
      .then((response) => {
        expect(response.body).toEqual({
          ...updatedCompany,
          id: createdCompany.id,
        });
      });
  });

  it('/company/:id (DELETE)', async () => {
    const createdCompany = await dataSource
      .getRepository(Company)
      .save(mockCompany);

    return request(app.getHttpServer())
      .delete(`/company/${createdCompany.id}`)
      .expect(HttpStatus.OK)
      .then(async () => {
        const deletedCompany = await dataSource
          .getRepository(Company)
          .findOneBy({ id: createdCompany.id });
        expect(deletedCompany).toBeNull();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
