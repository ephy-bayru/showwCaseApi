interface BaseModel {
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  [key: string]: Date | boolean | undefined;
}
