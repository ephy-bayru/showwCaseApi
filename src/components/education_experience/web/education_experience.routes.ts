import express from "express";
import EducationExperienceService from "../services/educationExperience.service";
import EducationExperienceController from "./educationExperience.controllers";
import EducationExperienceRepository from "../data/repository/educationExperienceRepository";
import EducationExperienceModel from "../data/schemas/EducationExperienceModel";
import asyncHandler from "../../../utils/asyncHandler";
import { Permission } from "../../../config/permissions";
import { authenticate } from "../../auth/middlewares/authenticate";
import { authorize } from "../../auth/middlewares/authorize";

const router = express.Router();

const educationExperienceRepository = new EducationExperienceRepository(
  EducationExperienceModel
);
const educationExperienceService = new EducationExperienceService(
  educationExperienceRepository
);

const educationExperienceController = new EducationExperienceController(
  educationExperienceService
);

router.post(
  "/:userId",
  authenticate,
  authorize(Permission.CREATE_EDUCATION),
  asyncHandler(
    educationExperienceController.createEducationExperiences.bind(
      educationExperienceController
    )
  )
);

router.get(
  "/user/:userId",
  authenticate,
  authorize(Permission.VIEW_USER_EDUCATIONS),
  asyncHandler(
    educationExperienceController.getAllEducationExperiencesByUserId.bind(
      educationExperienceController
    )
  )
);

router.get(
  "/:id",
  authenticate,
  authorize(Permission.VIEW_EDUCATION),
  asyncHandler(
    educationExperienceController.getEducationExperienceById.bind(
      educationExperienceController
    )
  )
);

router.put(
  "/:id",
  authenticate,
  authorize(Permission.UPDATE_EDUCATION),
  asyncHandler(
    educationExperienceController.updateEducationExperienceById.bind(
      educationExperienceController
    )
  )
);

router.delete(
  "/:id",
  authenticate,
  authorize(Permission.DELETE_EDUCATION),
  asyncHandler(
    educationExperienceController.deleteEducationExperienceById.bind(
      educationExperienceController
    )
  )
);

router.get(
  "/autocomplete/:query",
  authenticate,
  authorize(Permission.AUTOCOMPLETE_SCHOOL),
  asyncHandler(
    educationExperienceController.autoCompleteSchoolName.bind(
      educationExperienceController
    )
  )
);

export default router;
