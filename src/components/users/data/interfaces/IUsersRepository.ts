import BaseRepository from "../../../../repositories/BaseRepository";
import { IUser } from "./IUser";

export default interface IUsersRepository extends BaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  findByPhoneNumber(phoneNumber: string): Promise<IUser | null>;
}
