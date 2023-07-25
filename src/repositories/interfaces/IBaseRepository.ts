import { FilterQuery, Document, QueryOptions } from 'mongoose';

interface IBaseRepository<T extends Document> {
  create(entity: Partial<T>): Promise<T>;
  updateById(id: string, entity: Partial<T>): Promise<T | null>;
  getById(id: string): Promise<T | null>;
  deleteById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  search(query: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
  
  // Optionals
  count(query: FilterQuery<T>): Promise<number>;
  exists(query: FilterQuery<T>): Promise<boolean>;
  findOne(query: FilterQuery<T>, options?: QueryOptions): Promise<T | null>;
}

export default IBaseRepository;
