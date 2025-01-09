import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import {
  mockCompany,
  mockCompanyCreate,
  mockCompanyUpdate,
} from './mock/company.mock';

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;

  const mockCompanyService = {
    create: jest.fn().mockResolvedValue(mockCompany),
    update: jest.fn().mockResolvedValue(mockCompany),
    findAll: jest.fn().mockResolvedValue([mockCompany]),
    findOne: jest.fn().mockResolvedValue(mockCompany),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return a company', async () => {
      expect(await controller.create(mockCompanyCreate)).toEqual(mockCompany);
      expect(service.create).toHaveBeenCalledWith(mockCompanyCreate);
    });
  });

  describe('update', () => {
    it('should call service.update and return the updated company', async () => {
      const id = 1;
      expect(await controller.update(id, mockCompanyUpdate)).toEqual(
        mockCompany,
      );
      expect(service.update).toHaveBeenCalledWith(id, mockCompanyUpdate);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll and return all companies', async () => {
      expect(await controller.findAll()).toEqual([mockCompany]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call service.findOne and return a single company', async () => {
      const id = 1;
      expect(await controller.findOne(id)).toEqual(mockCompany);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('delete', () => {
    it('should call service.delete and return true', async () => {
      const id = 1;
      expect(await controller.delete(id)).toBe(true);
      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
