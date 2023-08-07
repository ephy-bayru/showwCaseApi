import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/IUser";
import { UserRole } from "../interfaces/IUser";

const AddressSchema: Schema = new Schema({
  country: { type: String, required: true },
  stateOrProvince: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: false },
  streetAddress: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.User },
  address: { type: AddressSchema, required: true },
  educationExperiences: [
    { type: mongoose.Schema.Types.ObjectId, ref: "EducationExperience" },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  suspended: { type: Boolean, default: false },
});

UserSchema.index({ firstName: "text", lastName: "text", email: "text" });

export default mongoose.model<IUser & Document>("User", UserSchema);
