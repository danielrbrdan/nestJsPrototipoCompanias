import {
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';

export abstract class BaseService<T extends { id: number }> {
  constructor(protected readonly repository: Repository<T>) {}

  findOneRelations?: FindOptionsRelations<T>;

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations: this.findOneRelations,
    });
  }

  async create(dto: DeepPartial<T>): Promise<T> {
    delete dto.id;
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async update(id: number, dto: DeepPartial<T>): Promise<T> {
    const found = await this.findOne(id);
    this.repository.merge(found, dto);
    return this.repository.save(found);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
