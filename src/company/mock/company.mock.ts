import {
  mockAddress,
  mockAddressCreate,
  mockAddressUpdate,
} from 'src/address/mock/address.mock';
import { Company } from '../entity/company.entity';
import { CompanyCreateDto } from '../dto/company-create.dto';
import { CompanyUpdateDto } from '../dto/company-update.dto';

export const mockCompany: Company = {
  id: 1,
  name: 'Test Company',
  cnpj: '12345678',
  email: 'email@test.com',
  address: mockAddress,
  phone: '31988888888',
};

export const mockCompanyCreate: CompanyCreateDto = {
  ...mockCompany,
  address: mockAddressCreate,
  id: undefined,
} as CompanyCreateDto;

export const mockCompanyUpdate: CompanyUpdateDto = {
  ...mockCompany,
  address: mockAddressUpdate,
  id: 1,
};
