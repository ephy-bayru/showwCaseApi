import { IUser } from '../interfaces/IUser';
import BaseRepository from '../../../../repositories/BaseRepository';
import UserModel from '../schemas/UserModel';

class UsersRepository extends BaseRepository<IUser> {
  constructor(userModel: typeof UserModel) {
    super(userModel);
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email });
  }

  public async findByPhoneNumber(phoneNumber: string): Promise<IUser | null> {
    return this.findOne({ phoneNumber });
  }

  public async searchByText(searchQuery: string): Promise<IUser[]> {
    return this.model.find({
      $text: {
        $search: searchQuery,
        $caseSensitive: false,
        $diacriticSensitive: false,
      },
    });
  }

}

export default UsersRepository;
