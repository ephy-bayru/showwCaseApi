import { Document } from 'mongoose';
import BaseModel from '../../../../interfaces/BaseModel';

export interface IEducationExperience extends Document, BaseModel {
  userId: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number | string;
  grade: string; 
  description: string;
  status?: EducationExperienceStatus; 
}

export interface IEducationExperienceView extends IEducationExperience {}


export enum EducationExperienceStatus {
  Active = "active",
  Completed = "completed",
  Pending = "pending",
}
