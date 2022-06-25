import { HttpException, HttpStatus } from '@nestjs/common';
import { ExtendedEntity } from '../database/extended-entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
  Repository,
} from 'typeorm';

export class CrudService<T extends ExtendedEntity> {
  protected repository: Repository<T>;

  constructor(repository?: Repository<T>) {
    if (repository) {
      this.repository = repository;
    }
  }
  get repo() {
    return this.repository;
  }

  public createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    const entities = await this.repository.find(options);
    return entities;
  }

  async findAndCount(options: FindManyOptions<T>): Promise<[T[], number]> {
    const [entities, count] = await this.repository.findAndCount(options);
    return [entities, count];
  }

  public async findOneById(id: string): Promise<T> {
    try {
      const entity = await this.repository.findOneOrFail(id);
      return entity;
    } catch (e) {
      throw new HttpException(
        {
          error: 'Database',
          message: 'Item not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async findOne(options?: FindOneOptions<T>): Promise<T> {
    const entity = await this.repository.findOne(options);
    return entity;
  }

  public async create(data: DeepPartial<T>): Promise<T> {
    const now = new Date();
    const entity: T = this.repository.create(data);
    entity.createdAt = now;
    entity.updatedAt = now;
    return entity.save();
  }

  public async saveAll(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(data);
  }

  public async update(data: DeepPartial<T> | T): Promise<T> {
    const id = String(data.id || '');
    return this.patch(id, data);
  }

  public async patch(id: string, data: DeepPartial<T> | T): Promise<T> {
    let entity: T = null;
    const now = new Date();
    if (data instanceof ExtendedEntity) {
      entity = data;
    } else {
      entity = await this.findOneById(id);
      if (data.id) {
        delete data.id;
      }
      this.repository.merge(entity, data);
    }
    let createdAt = entity.createdAt;
    if (!createdAt) {
      createdAt = now;
    }
    entity.createdAt = createdAt;
    entity.updatedAt = now;
    return entity.save();
  }

  public async softDelete({ id }: DeepPartial<T>) {
    const now = new Date();
    const entity = await this.findOneById(id as any);
    entity.updatedAt = now;
    return await this.repository.softDelete(entity.id);
  }

  public async bulkSoftDelete(entitys: DeepPartial<T>[]) {
    const ids = entitys.map((val) => val.id);
    const qb = await this.repository
      .createQueryBuilder()
      .softDelete()
      .where('id IN (:...ids)', { ids });
    return await qb.execute();
  }

  public merge(entity: T, data: DeepPartial<T>): T {
    return this.repository.merge(entity, data);
  }
}
