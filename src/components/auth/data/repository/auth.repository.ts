import BaseRepository from '../../../../repositories/BaseRepository';
import { Types } from 'mongoose';
import { IUser } from '../../../users/data/interfaces/IUser';
import UserModel from '../../../users/data/schemas/UserModel';
import { IUserRepository } from '../interfaces/IAuthRepository';

class AuthRepository extends BaseRepository<IUser> implements IUserRepository {

  constructor() {
    super(UserModel);
  }

  async getByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email });
  }

  public async getByResetToken(resetToken: string): Promise<IUser | null> {
    return await UserModel.findOne({ resetToken });
  }

  async updateResetToken(id: Types.ObjectId, resetToken: string | null): Promise<IUser | null> {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { $set: { resetToken } },
      { new: true }
    );
}

}

export default AuthRepository;