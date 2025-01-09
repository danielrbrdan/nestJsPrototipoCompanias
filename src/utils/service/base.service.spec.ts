import { DeleteResult, Repository } from 'typeorm';
import { BaseService } from './base.service';

class TestEntity {
  id: number;
  name: string;
}

class TestService extends BaseService<TestEntity> {}

describe('BaseService', () => {
  let service: TestService;
  let repository: jest.Mocked<Repository<TestEntity>>;

  beforeEach(() => {
    repository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      merge: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<Repository<TestEntity>>;

    service = new TestService(repository);
  });

  it('should call repository.find and return all entities', async () => {
    const mockEntities = [{ id: 1, name: 'Entity 1' }];
    repository.find.mockResolvedValue(mockEntities);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockEntities);
  });

  it('should call repository.findOne and return the entity', async () => {
    const mockEntity = { id: 1, name: 'Entity 1' };
    repository.findOne.mockResolvedValue(mockEntity);

    const result = await service.findOne(1);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: undefined,
    });
    expect(result).toEqual(mockEntity);
  });

  it('should call repository.create and repository.save to create a new entity', async () => {
    const mockEntity = { id: 1, name: 'Entity 1' };
    repository.create.mockReturnValue(mockEntity);
    repository.save.mockResolvedValue(mockEntity);

    const result = await service.create({ name: 'Entity 1' });

    expect(repository.create).toHaveBeenCalledWith({ name: 'Entity 1' });
    expect(repository.save).toHaveBeenCalledWith(mockEntity);
    expect(result).toEqual(mockEntity);
  });

  it('should call repository.update and return the updated entity', async () => {
    const mockEntity = { id: 1, name: 'Updated Entity' };
    repository.findOne.mockResolvedValue(mockEntity);
    repository.save.mockResolvedValue(mockEntity);

    const result = await service.update(1, { name: 'Updated Entity' });

    expect(repository.save).toHaveBeenCalledWith({
      ...mockEntity,
    });
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: undefined,
    });
    expect(result).toEqual(mockEntity);
  });

  it('should call repository.delete and return true if successful', async () => {
    repository.delete.mockResolvedValue({ affected: 1 } as DeleteResult);

    const result = await service.delete(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });

  it('should call repository.delete and return false if unsuccessful', async () => {
    repository.delete.mockResolvedValue({ affected: 0 } as DeleteResult);

    const result = await service.delete(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(result).toBe(false);
  });
});
