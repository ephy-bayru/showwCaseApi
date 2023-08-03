import { IEducationExperience } from './IEducationExperience';
import BaseRepository from '../../../../repositories/BaseRepository';

export default interface IEducationExperienceRepository extends BaseRepository<IEducationExperience> {
  autoCompleteSchoolName(query: string): Promise<string[]>;
}
