import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './company.service';
import { Company } from './entity/company.entity';
import { Address } from 'src/address/entity/adress.entity';

@Module({
  providers: [CompanyService],
  imports: [TypeOrmModule.forFeature([Company, Address])],
  exports: [CompanyService],
})
export class CompanyModule {}
