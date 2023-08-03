import Joi, { CustomHelpers } from "joi";
import { ObjectId } from "mongodb";
import { IUser } from "../interfaces/IUser";

export const validateUser = (user: Partial<IUser>) => {
  const schema = Joi.object({
    _id: Joi.custom((value: any, helpers: CustomHelpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.message({ custom: "Invalid Id" });
      }
      return value;
    }).optional(),
    email: Joi.string().required().email().messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required",
    }),
    firstName: Joi.string().required().min(2).max(255).messages({
      "string.empty": "First Name cannot be empty",
      "string.min": "First Name must be at least {#limit} characters long",
      "string.max": "First Name cannot be longer than {#limit} characters",
      "any.required": "First Name is required",
    }),
    lastName: Joi.string().required().min(2).max(255).messages({
      "string.empty": "Last Name cannot be empty",
      "string.min": "Last Name must be at least {#limit} characters long",
      "string.max": "Last Name cannot be longer than {#limit} characters",
      "any.required": "Last Name is required",
    }),
    gender: Joi.string().required().messages({
      "string.empty": "Gender cannot be empty",
      "any.required": "Gender is required",
    }),
    phoneNumber: Joi.string().required().messages({
      "string.empty": "Phone Number cannot be empty",
      "any.required": "Phone Number is required",
    }),
    address: Joi.object({
      country: Joi.string().required(),
      stateOrProvince: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().optional(),
      streetAddress: Joi.string().required(),
      postalCode: Joi.string().required(),
    }).required(),
  });

  return schema.validate(user);
};
