import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CompanyCreateDto } from './company-create.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { AddressUpdateDto } from 'src/address/dto/address-update.dto';
import { Type } from 'class-transformer';

export class CompanyUpdateDto extends OmitType(CompanyCreateDto, ['address']) {
  @IsOptional()
  id: number;

  @IsOptional()
  @ValidateNested({ message: 'O endereço deve ser um objeto válido.' })
  @Type(() => AddressUpdateDto)
  address?: AddressUpdateDto;
}
