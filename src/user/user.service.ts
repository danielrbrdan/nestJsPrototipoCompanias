import { Body, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/utils/service/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    protected repository: Repository<User>,
  ) {
    super(repository);
  }

  async findOneByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User> {
    return this.repository.findOneBy({
      username,
      password,
    });
  }
}
