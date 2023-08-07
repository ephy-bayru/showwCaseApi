import Joi from "joi";
import { IUser, UserRole } from "../../data/interfaces/IUser";

export const validateUser = (user: Partial<IUser>) => {
  const schema = Joi.object({
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
    role: Joi.string()
      .valid(UserRole.User, UserRole.Admin)
      .required()
      .messages({
        "string.empty": "Role cannot be empty",
        "any.only": "Role must be 'User' or 'Admin'",
        "any.required": "Role is required",
      }),
    address: Joi.object({
      country: Joi.string().required(),
      stateOrProvince: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().optional(),
      streetAddress: Joi.string().required(),
      postalCode: Joi.string().required(),
    }).required(),
    suspended: Joi.boolean().optional().default(false),
  });

  return schema.validate(user);
};
