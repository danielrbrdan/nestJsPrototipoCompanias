import { Injectable } from '@nestjs/common';
import { Company } from './entity/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { DeepPartial, FindOptionsRelations, Repository } from 'typeorm';
import { CompanyCreateDto } from './dto/company-create.dto';
import { BaseService } from 'src/utils/service/base.service';

@Injectable()
export class CompanyService extends BaseService<Company> {
  constructor(
    @InjectRepository(Company)
    protected repository: Repository<Company>,
  ) {
    super(repository);
    this.findOneRelations = ['endereco'] as FindOptionsRelations<Company>;
  }
}
