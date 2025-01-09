import { IsString, IsNotEmpty, Matches, IsNumber, IsNumberString } from 'class-validator';
import { cepRegex } from 'src/utils/variables/common-variables';

export class AddressCreateDto {
  @IsNotEmpty({ message: 'O logradouro é obrigatório.' })
  @IsString()
  street: string;

  @IsNotEmpty({ message: 'O número é obrigatório.' })
  @IsNumberString({}, { message: 'O valor informado deve ser um número.' })
  numero: string;

  @IsNotEmpty({ message: 'O bairro é obrigatório.' })
  @IsString()
  neighborhood: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  @IsString()
  city: string;

  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  @IsString()
  state: string;

  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  @Matches(cepRegex, { message: 'O CEP deve ser válido.' })
  zipCode: string;
}
