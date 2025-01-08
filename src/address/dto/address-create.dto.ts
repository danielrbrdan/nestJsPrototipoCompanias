import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { cepRegex } from 'src/utils/variables/common-variables';

export class AddressCreateDto {
  @IsNotEmpty({ message: 'O logradouro é obrigatório.' })
  @IsString()
  logradouro: string;

  @IsNotEmpty({ message: 'O número é obrigatório.' })
  @IsString()
  numero: string;

  @IsNotEmpty({ message: 'O bairro é obrigatório.' })
  @IsString()
  bairro: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  @IsString()
  cidade: string;

  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  @IsString()
  estado: string;

  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  @Matches(cepRegex, { message: 'O CEP deve ser válido.' })
  cep: string;
}
