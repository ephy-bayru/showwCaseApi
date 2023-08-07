import IBaseRepository from "../../../../repositories/interfaces/IBaseRepository";
import { IUser } from "../../../users/data/interfaces/IUser";

export interface IUserRepository extends IBaseRepository<IUser> {
  getByEmail(email: string): Promise<IUser | null>;
}
