import { mockAddress } from 'src/address/mock/address.mock';
import { Company } from '../entity/company.entity';
import { CompanyCreateDto } from '../dto/company-create.dto';
import { CompanyUpdateDto } from '../dto/company-update.dto';

export const mockCompany: Company = {
  id: 1,
  nome: 'Test Company',
  cnpj: '12345678',
  email: 'email@test.com',
  endereco: mockAddress,
  telefone: '31988888888',
};

export const mockCompanyCreate: CompanyCreateDto = {
  ...mockCompany,
  id: undefined,
} as CompanyCreateDto;

export const mockCompanyUpdate: CompanyUpdateDto = {
  ...mockCompanyCreate,
};
