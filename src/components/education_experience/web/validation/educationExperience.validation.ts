import Joi from "joi";

const educationExperienceSchema = Joi.object({
  schoolName: Joi.string().required(),
  degree: Joi.string().required(),
  fieldOfStudy: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
});

function validateEducationExperience(educationExperience: any) {
  const { error } = educationExperienceSchema.validate(educationExperience);
  return error;
}
