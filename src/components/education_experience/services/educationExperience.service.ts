import { ObjectId } from "mongodb";
import IEducationExperienceRepository from "../data/interfaces/IEducationExperienceRepository";
import { IEducationExperience } from "../data/interfaces/IEducationExperience";
import CustomError from "../../../error/CustomError";

class EducationExperienceService {
  private educationExperienceRepository: IEducationExperienceRepository;

  constructor(educationExperienceRepository: IEducationExperienceRepository) {
    this.educationExperienceRepository = educationExperienceRepository;
  }

  private validateObjectId(id: string): void {
    if (!ObjectId.isValid(id)) {
      throw new CustomError(400, "", "Invalid education experience ID");
    }
  }

  async createEducationExperience(
    userId: string,
    educationExperience: Partial<IEducationExperience>[]
  ): Promise<IEducationExperience[]> {
    educationExperience.forEach((exp) => (exp.userId = userId));
    if (educationExperience.length === 1) {
      const [singleExperience] = educationExperience;
      const createdEducationExperience =
        await this.educationExperienceRepository.create(singleExperience);
      return [createdEducationExperience];
    }
    return await this.educationExperienceRepository.bulkCreate(
      educationExperience
    );
  }

  async getEducationExperienceById(
    userId: string,
    id: string
  ): Promise<IEducationExperience> {
    this.validateObjectId(id);
    const educationExperience =
      await this.educationExperienceRepository.getById({
        id,
        options: { userId },
      });
    if (!educationExperience) {
      throw new CustomError(
        404,
        "Education Experience not found",
        "No education experience could be found for the provided ID"
      );
    }
    return educationExperience;
  }

  async updateEducationExperienceById(
    userId: string,
    id: string,
    educationExperience: Partial<IEducationExperience>
  ): Promise<IEducationExperience> {
    this.validateObjectId(id);
    const updatedEducationExperience =
      await this.educationExperienceRepository.updateById({
        id,
        entity: educationExperience,
        options: { userId },
      });
    if (!updatedEducationExperience) {
      throw new CustomError(
        404,
        "Education Experience not found",
        "No education experience could be found for the provided ID"
      );
    }
    return updatedEducationExperience;
  }

  async deleteEducationExperienceById(
    userId: string,
    id: string
  ): Promise<IEducationExperience> {
    this.validateObjectId(id);
    const deletedEducationExperience =
      await this.educationExperienceRepository.deleteById({
        id,
        options: { userId },
      });
    if (!deletedEducationExperience) {
      throw new CustomError(
        404,
        "Education Experience not found",
        "No education experience could be found for the provided ID"
      );
    }
    return deletedEducationExperience;
  }

  async getAllEducationExperiencesByUserId(
    userId: string
  ): Promise<IEducationExperience[]> {
    return await this.educationExperienceRepository.search({ userId });
  }

  async autoCompleteSchoolName(query: string): Promise<string[]> {
    return await this.educationExperienceRepository.autoCompleteSchoolName(
      query
    );
  }
}

export default EducationExperienceService;
