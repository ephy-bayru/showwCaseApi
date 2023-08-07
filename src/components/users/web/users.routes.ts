import express from "express";
import UsersService from "../services/users.service";
import UsersController from "./users.controllers";
import UsersRepository from "../data/repository/usersRepository";
import UserModel from "../data/schemas/UserModel";
import asyncHandler from "../../../utils/asyncHandler";
import EducationExperienceService from "../../education_experience/services/educationExperience.service";
import EducationExperienceModel from "../../education_experience/data/schemas/EducationExperienceModel";
import EducationExperienceRepository from "../../education_experience/data/repository/educationExperienceRepository";
import { Permission } from "../../../config/permissions";
import { authenticate } from "../../auth/middlewares/authenticate";
import { authorize } from "../../auth/middlewares/authorize";

const userRouter = express.Router();

const usersRepository = new UsersRepository(UserModel);
const educationExperienceRepository = new EducationExperienceRepository(
  EducationExperienceModel
);
const educationExperienceService = new EducationExperienceService(
  educationExperienceRepository
);

const usersService = new UsersService(
  usersRepository,
  educationExperienceService
);
const usersController = new UsersController(usersService);

userRouter.get(
  "/",
  authenticate,
  authorize(Permission.VIEW_USERS),
  asyncHandler(usersController.getUsers.bind(usersController))
);

userRouter.get(
  "/:id",
  authenticate,
  authorize(Permission.VIEW_USER),
  asyncHandler(usersController.getUserById.bind(usersController))
);

userRouter.post(
  "/",
  asyncHandler(usersController.createUser.bind(usersController))
);

userRouter.put(
  "/:id",
  authenticate,
  authorize(Permission.UPDATE_USER),
  asyncHandler(usersController.updateUserById.bind(usersController))
);

userRouter.delete(
  "/:id",
  authenticate,
  authorize(Permission.DELETE_USER),
  asyncHandler(usersController.deleteUserById.bind(usersController))
);

userRouter.get(
  "/search/:query",
  authenticate,
  authorize(Permission.SEARCH_USERS),
  asyncHandler(usersController.searchUsers.bind(usersController))
);

export default userRouter;
