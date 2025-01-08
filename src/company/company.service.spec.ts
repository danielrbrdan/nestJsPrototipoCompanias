import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { Company } from './entity/company.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { mockCompany, mockCompanyCreate } from './mock/company.mock';

describe('CompanyService', () => {
  let companyService: CompanyService;
  let companyRepository: Repository<Company>;

  const mockCompanyRepository = {
    find: jest.fn().mockResolvedValue([mockCompany]),
    findOne: jest.fn().mockResolvedValue(mockCompany),
    create: jest.fn().mockReturnValue(mockCompany),
    save: jest.fn().mockResolvedValue(mockCompany),
    update: jest.fn().mockResolvedValue(mockCompany),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useValue: mockCompanyRepository,
        },
      ],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);
    companyRepository = module.get<Repository<Company>>(
      getRepositoryToken(Company),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(companyService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const result = await companyService.findAll();
      expect(result).toEqual([mockCompany]);
      expect(mockCompanyRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a company by id', async () => {
      const id = 1;
      const result = await companyService.findOne(id);
      expect(result).toEqual(mockCompany);
      expect(mockCompanyRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['endereco'],
      });
    });

    it('should return null if company is not found', async () => {
      const id = 999;
      mockCompanyRepository.findOne.mockResolvedValue(null);

      const result = await companyService.findOne(id);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new company and return it', async () => {
      const result = await companyService.create(mockCompanyCreate);
      expect(result).toEqual(mockCompany);
      expect(mockCompanyRepository.create).toHaveBeenCalledWith(
        mockCompanyCreate,
      );
      expect(mockCompanyRepository.save).toHaveBeenCalledWith(mockCompany);
    });
  });

  describe('update', () => {
    it('should update a company and return the updated company', async () => {
      const id = 1;
      await companyService.update(id, mockCompanyCreate);
      expect(mockCompanyRepository.update).toHaveBeenCalledWith(
        id,
        mockCompanyCreate,
      );
    });
  });

  describe('delete', () => {
    it('should delete a company and return true', async () => {
      const id = 1;
      const result = await companyService.delete(id);
      expect(result).toBe(true);
      expect(mockCompanyRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should return false if deletion failed', async () => {
      const id = 999;
      mockCompanyRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await companyService.delete(id);
      expect(result).toBe(false);
    });
  });
});
