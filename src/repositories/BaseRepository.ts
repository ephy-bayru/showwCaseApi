import { FilterQuery, Model, Document, QueryOptions } from "mongoose";
import IBaseRepository, {
  RepositoryOptions,
} from "./interfaces/IBaseRepository";

class BaseRepository<T extends Document> implements IBaseRepository<T> {
  private _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  protected get model(): Model<T> {
    return this._model;
  }

  async create(entity: Partial<T>): Promise<T> {
    const newEntity = new this.model(entity);
    return await newEntity.save();
  }

  async bulkCreate(entities: Partial<T>[]): Promise<T[]> {
    return (await this.model.insertMany(entities)) as unknown as T[];
  }

  async updateById(params: {
    id: string;
    entity: Partial<T>;
    options?: RepositoryOptions;
  }): Promise<T | null> {
    return await this.model.findByIdAndUpdate(params.id, params.entity, {
      new: true,
    });
  }

  async getById(params: {
    id: string;
    options?: RepositoryOptions;
  }): Promise<T | null> {
    return await this.model.findById(params.id);
  }

  async deleteById(params: {
    id: string;
    options?: RepositoryOptions;
  }): Promise<T | null> {
    return await this.model.findByIdAndDelete(params.id);
  }

  async getAll(options?: RepositoryOptions): Promise<T[]> {
    return await this.model.find();
  }

  async search(
    query: FilterQuery<T>,
    options?: QueryOptions & RepositoryOptions
  ): Promise<T[]> {
    return await this.model.find(query, null, options);
  }

  async count(query: FilterQuery<T>): Promise<number> {
    return await this.model.countDocuments(query);
  }

  async exists(query: FilterQuery<T>): Promise<boolean> {
    const documentExists = await this.model.exists(query);
    return !!documentExists;
  }

  async findOne(
    query: FilterQuery<T>,
    options?: QueryOptions & RepositoryOptions
  ): Promise<T | null> {
    return await this.model.findOne(query, null, options);
  }
}

export default BaseRepository;
