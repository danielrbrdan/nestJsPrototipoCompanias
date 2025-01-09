import { AddressCreateDto } from '../dto/address-create.dto';
import { AddressUpdateDto } from '../dto/address-update.dto';
import { Address } from '../entity/adress.entity';

export const mockAddress: Address = {
  neighborhood: 'neighborhood',
  zipCode: '123',
  city: 'city',
  state: 'state',
  street: 'Rua tal',
  numero: '12',
} as Address;

export const mockAddressCreate: AddressCreateDto = {
  ...mockAddress,
  id: undefined,
} as AddressCreateDto;

export const mockAddressUpdate: AddressUpdateDto = {
  ...mockAddress,
  id: 1,
};
