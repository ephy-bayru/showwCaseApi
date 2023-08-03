import { ObjectId } from "mongodb";
import CustomError from "../../../error/CustomError";
import { IUser } from "../data/interfaces/IUser";
import UsersRepository from "../data/repository/usersRepository";
import { paginate } from "../../../helpers/paginate";
import { IPaginatedData } from "../../../interfaces/IPaginatedData";
import { IPaginationOptions } from "../../../interfaces/IPaginationOptions";
import EducationExperienceService from "../../education_experience/services/educationExperience.service";

class UsersService {
  private usersRepository: UsersRepository;
  private educationExperienceService: EducationExperienceService;

  constructor(
    usersRepository: UsersRepository,
    educationExperienceService: EducationExperienceService
  ) {
    this.usersRepository = usersRepository;
    this.educationExperienceService = educationExperienceService;
  }

  private validateObjectId(id: string): void {
    if (!ObjectId.isValid(id)) {
      throw new CustomError(400, "", "Invalid user ID");
    }
  }

  async createUser(user: Partial<IUser>): Promise<IUser> {
    await this.validateUserDuplication(user);
    const createdUser = await this.usersRepository.create(user);
    return createdUser;
  }

  private async validateUserDuplication(user: Partial<IUser>): Promise<void> {
    await this.checkEmailDuplication(user.email);
  }

  private async checkEmailDuplication(email?: string): Promise<void> {
    if (email) {
      const existingUserByEmail = await this.usersRepository.findByEmail(email);
      if (existingUserByEmail) {
        throw new CustomError(
          400,
          "",
          "The provided email is already associated with another account"
        );
      }
    }
  }

  async getUserById(params: { id: string }): Promise<IUser> {
    this.validateObjectId(params.id);
    const user = await this.usersRepository.getById({ id: params.id });
    if (!user) {
      throw new CustomError(
        404,
        "User not found",
        "No user could be found for the provided ID"
      );
    }

    user.educationExperiences =
      await this.educationExperienceService.getAllEducationExperiencesByUserId(
        params.id
      );

    return user;
  }

  async updateUserById(params: {
    id: string;
    user: Partial<IUser>;
  }): Promise<IUser> {
    this.validateObjectId(params.id);
    await this.checkEmailDuplication(params.user.email);
    const updatedUser = await this.usersRepository.updateById({
      id: params.id,
      entity: params.user,
    });
    if (!updatedUser) {
      throw new CustomError(
        404,
        "User not found",
        "No user could be found for the provided ID"
      );
    }
    return updatedUser;
  }

  async deleteUserById(params: { id: string }): Promise<IUser> {
    this.validateObjectId(params.id);
    const deletedUser = await this.usersRepository.deleteById(params);
    if (!deletedUser) {
      throw new CustomError(
        404,
        "User not found",
        "No user could be found for the provided ID"
      );
    }
    return deletedUser;
  }

  async getUsers(
    paginationOptions: IPaginationOptions<IUser>
  ): Promise<IPaginatedData<IUser>> {
    const users = await this.usersRepository.getAll();
    return paginate(users, paginationOptions, (user: IUser) => user);
  }

  async searchUsers(
    searchQuery: string,
    paginationOptions: IPaginationOptions<IUser>
  ): Promise<IPaginatedData<IUser>> {
    const users = await this.usersRepository.searchByText(searchQuery);
    return paginate(users, paginationOptions, (user: IUser) => user);
  }
}

export default UsersService;
