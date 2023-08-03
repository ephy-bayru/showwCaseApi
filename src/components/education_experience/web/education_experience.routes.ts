import express from "express";
import EducationExperienceService from "../services/educationExperience.service";
import EducationExperienceController from "./educationExperience.controllers";
import EducationExperienceRepository from "../data/repository/educationExperienceRepository";
import EducationExperienceModel from "../data/schemas/EducationExperienceModel";
import asyncHandler from "../../../utils/asyncHandler";

const router = express.Router();

const educationExperienceRepository = new EducationExperienceRepository(EducationExperienceModel);
const educationExperienceService = new EducationExperienceService(educationExperienceRepository);

const educationExperienceController = new EducationExperienceController(educationExperienceService);

router.post("/:userId", asyncHandler(educationExperienceController.createEducationExperiences.bind(educationExperienceController)));
router.get("/user/:userId", asyncHandler(educationExperienceController.getAllEducationExperiencesByUserId.bind(educationExperienceController)));
router.get("/:id", asyncHandler(educationExperienceController.getEducationExperienceById.bind(educationExperienceController)));
router.put("/:id", asyncHandler(educationExperienceController.updateEducationExperienceById.bind(educationExperienceController)));
router.delete("/:id", asyncHandler(educationExperienceController.deleteEducationExperienceById.bind(educationExperienceController)));
router.get("/autocomplete/:query", asyncHandler(educationExperienceController.autoCompleteSchoolName.bind(educationExperienceController)));

export default router;
