import { IEducationExperience } from "../interfaces/IEducationExperience";
import BaseRepository from "../../../../repositories/BaseRepository";
import IEducationExperienceRepository from "../interfaces/IEducationExperienceRepository";
import EducationExperienceModel from "../schemas/EducationExperienceModel";

class EducationExperienceRepository
  extends BaseRepository<IEducationExperience>
  implements IEducationExperienceRepository
{
  constructor(educationExperienceModel: typeof EducationExperienceModel) {
    super(educationExperienceModel);
  }

  public async autoCompleteSchoolName(query: string): Promise<string[]> {
    const schools = await EducationExperienceModel.find({
      schoolName: { $regex: new RegExp(query, "i") },
    }).distinct("schoolName");

    return schools;
  }
}

export default EducationExperienceRepository;
