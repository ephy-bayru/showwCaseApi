import mongoose, { Schema, Document } from "mongoose";
import {
  IEducationExperience,
  EducationExperienceStatus,
} from "../interfaces/IEducationExperience";

const EducationExperienceSchema: Schema = new Schema({
  userId: { type: String, required: true },
  schoolName: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Schema.Types.Mixed, required: true },
  description: { type: String, required: true },
  grade: { type: String, required: false },
  status: {
    type: String,
    enum: Object.values(EducationExperienceStatus),
    default: EducationExperienceStatus.Pending,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
});

export default mongoose.model<IEducationExperience & Document>(
  "EducationExperience",
  EducationExperienceSchema
);
