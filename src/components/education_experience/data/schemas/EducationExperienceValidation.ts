import Joi from "joi";
import {
  IEducationExperience,
  EducationExperienceStatus,
} from "../interfaces/IEducationExperience";

export const validateEducationExperience = (
  educationExperience: IEducationExperience
) => {
  const schema = Joi.object({
    userId: Joi.string().required().messages({
      "string.empty": "User ID cannot be empty",
      "any.required": "User ID is required",
    }),
    schoolName: Joi.string().required().messages({
      "string.empty": "School Name cannot be empty",
      "any.required": "School Name is required",
    }),
    degree: Joi.string().required().messages({
      "string.empty": "Degree cannot be empty",
      "any.required": "Degree is required",
    }),
    fieldOfStudy: Joi.string().required().messages({
      "string.empty": "Field of Study cannot be empty",
      "any.required": "Field of Study is required",
    }),
    grade: Joi.string().optional().messages({
      "string.empty": "Grade cannot be empty",
    }),
    startYear: Joi.number().required().integer().messages({
      "number.base": "Start Year must be a number",
      "number.integer": "Start Year must be an integer",
      "any.required": "Start Year is required",
    }),
    endYear: Joi.alternatives()
      .try(Joi.number().integer(), Joi.string())
      .required()
      .messages({
        "any.required": "End Year or Expected End Year is required",
      }),
    description: Joi.string().required().messages({
      "string.empty": "Description cannot be empty",
      "any.required": "Description is required",
    }),
    status: Joi.string()
      .valid(...Object.values(EducationExperienceStatus))
      .default(EducationExperienceStatus.Pending)
      .messages({
        "string.empty": "Status cannot be empty",
        "any.only": "Status must be a valid status",
      }),
  }).unknown();

  return schema.validate(educationExperience);
};
