import { FilterQuery, Document, QueryOptions } from 'mongoose';

export interface RepositoryOptions {
  [key: string]: any;
}

interface IBaseRepository<T extends Document> {
  create(entity: Partial<T>): Promise<T>;
  bulkCreate(entities: Partial<T>[]): Promise<T[]>;
  updateById(params: { id: string; entity: Partial<T>; options?: RepositoryOptions }): Promise<T | null>;
  getById(params: { id: string; options?: RepositoryOptions }): Promise<T | null>;
  deleteById(params: { id: string; options?: RepositoryOptions }): Promise<T | null>;
  getAll(options?: RepositoryOptions): Promise<T[]>;
  search(query: FilterQuery<T>, options?: QueryOptions & RepositoryOptions): Promise<T[]>;

  // Optionals
  count(query: FilterQuery<T>): Promise<number>;
  exists(query: FilterQuery<T>): Promise<boolean>;
  findOne(query: FilterQuery<T>, options?: QueryOptions & RepositoryOptions): Promise<T | null>;
}

export default IBaseRepository;
