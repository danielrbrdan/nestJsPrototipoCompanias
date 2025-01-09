import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { AddressCreateDto } from './address-create.dto';

export class AddressUpdateDto extends PartialType(AddressCreateDto) {
  @IsOptional()
  id: number;
}
