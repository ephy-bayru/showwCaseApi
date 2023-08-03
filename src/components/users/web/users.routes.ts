import express from "express";
import UsersService from "../services/users.service";
import UsersController from "./users.controllers";
import UsersRepository from "../data/repository/usersRepository";
import UserModel from "../data/schemas/UserModel";
import asyncHandler from "../../../utils/asyncHandler";
import EducationExperienceService from "../../education_experience/services/educationExperience.service";
import EducationExperienceModel from "../../education_experience/data/schemas/EducationExperienceModel";
import EducationExperienceRepository from "../../education_experience/data/repository/educationExperienceRepository";

const router = express.Router();

const usersRepository = new UsersRepository(UserModel);
const educationExperienceRepository = new EducationExperienceRepository(EducationExperienceModel);
const educationExperienceService = new EducationExperienceService(educationExperienceRepository);

const usersService = new UsersService(usersRepository, educationExperienceService);
const usersController = new UsersController(usersService);

router.get("/", asyncHandler(usersController.getUsers.bind(usersController)));
router.get("/:id", asyncHandler(usersController.getUserById.bind(usersController)));
router.post("/", asyncHandler(usersController.createUser.bind(usersController)));
router.put("/:id", asyncHandler(usersController.updateUserById.bind(usersController)));
router.delete("/:id", asyncHandler(usersController.deleteUserById.bind(usersController)));
router.get("/search/:query", asyncHandler(usersController.searchUsers.bind(usersController)));

export default router;
