import { Types } from "mongoose";
import AuthRepository from "../data/repository/auth.repository";
import { IUser } from "../../users/data/interfaces/IUser";

interface SearchOptions {
  [key: string]: any;
}
export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.authRepository.getByEmail(email);
  }

}