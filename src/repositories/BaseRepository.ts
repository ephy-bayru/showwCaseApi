import { FilterQuery, Model, Document, QueryOptions } from "mongoose";
import IBaseRepository from "./interfaces/IBaseRepository";

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

  async updateById(id: string, entity: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, entity, { new: true });
  }

  async getById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async deleteById(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async getAll(): Promise<T[]> {
    return await this.model.find();
  }

  async search(query: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
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
    options?: QueryOptions
  ): Promise<T | null> {
    return await this.model.findOne(query, null, options);
  }
}

export default BaseRepository;
