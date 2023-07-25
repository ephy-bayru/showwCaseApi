import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import { IDatabase } from './interfaces/IDatabase';

export class MongoDB implements IDatabase {
  private readonly connectionString: string;
  private readonly dbClient: Mongoose;

  constructor(uri: string, dbClient = mongoose) {
    this.connectionString = uri;
    this.dbClient = dbClient;
  }

  public async connect(): Promise<void> {
    try {
      await this.dbClient.connect(this.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      } as ConnectOptions);

      console.log('Database connected successfully');

    } catch (error) {
      console.error('Error connecting to the database', error);
      throw error;
    }
  }
}
