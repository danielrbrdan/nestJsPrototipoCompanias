import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, Matches, ValidateNested } from 'class-validator';
import { AddressCreateDto } from 'src/address/dto/address-create.dto';
import { cnpjRegex, phoneRegex } from 'src/utils/variables/common-variables';

export class CompanyCreateDto {
  @IsNotEmpty({ message: 'O nome da empresa é obrigatório.' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'O CNPJ é obrigatório.' })
  @Matches(cnpjRegex, {
    message: 'O CNPJ deve ser válido',
  })
  cnpj: string;

  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  @ValidateNested({ message: 'O endereço deve ser um objeto válido.' })
  @Type(() => AddressCreateDto)
  endereco: AddressCreateDto;

  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @IsString()
  @Matches(phoneRegex, {
    message: 'O telefone deve ter o formato válido (XX) XXXXX-XXXX.',
  })
  telefone: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
  email: string;
}
