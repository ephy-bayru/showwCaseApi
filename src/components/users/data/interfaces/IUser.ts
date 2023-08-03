import { Document } from 'mongoose';
import BaseModel from "../../../../interfaces/BaseModel";
import { IEducationExperience } from '../../../education_experience/data/interfaces/IEducationExperience';

export interface Address {
  country: string;
  stateOrProvince: string;
  city: string;
  district: string;
  streetAddress: string;
  postalCode: string;
}

export interface IUser extends Document, BaseModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  address: Address;
  educationExperiences?: IEducationExperience[];
}

export interface IUserView extends Omit<IUser, 'password'> {}
