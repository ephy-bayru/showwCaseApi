import { Request, Response, NextFunction } from "express";
import ResponseHandler from "../../../helpers/httpResponse.helper";
import EducationExperienceService from "../services/educationExperience.service";
import { validateEducationExperience } from "../data/schemas/EducationExperienceValidation";
import CustomError from "../../../error/CustomError";

class EducationExperienceController {
  private educationExperienceService: EducationExperienceService;

  constructor(educationExperienceService: EducationExperienceService) {
    this.educationExperienceService = educationExperienceService;
  }

  private async handleRequest(
    req: Request,
    res: Response,
    next: NextFunction,
    handler: () => Promise<any>,
    successStatusCode: number
  ): Promise<void> {
    try {
      const result = await handler();
      ResponseHandler.send(res, successStatusCode, result);
    } catch (err) {
      next(err);
    }
  }

  async createEducationExperiences(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.params.userId;
    const educationExperiences = Array.isArray(req.body)
      ? req.body
      : [req.body];
    educationExperiences.forEach((experience) => {
      const validationResults = validateEducationExperience(experience);
      if (validationResults.error) {
        throw new CustomError(
          400,
          validationResults.error.details[0].message,
          "Invalid data provided for education experience creation"
        );
      }
    });
    await this.handleRequest(
      req,
      res,
      next,
      () =>
        this.educationExperienceService.createEducationExperience(
          userId,
          educationExperiences
        ),
      201
    );
  }

  async getEducationExperienceById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.params.userId;
    const id = req.params.id;
    await this.handleRequest(
      req,
      res,
      next,
      () =>
        this.educationExperienceService.getEducationExperienceById(userId, id),
      200
    );
  }

  async updateEducationExperienceById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.params.userId;
    const id = req.params.id;
    const educationExperience = req.body;
    await this.handleRequest(
      req,
      res,
      next,
      () =>
        this.educationExperienceService.updateEducationExperienceById(
          userId,
          id,
          educationExperience
        ),
      200
    );
  }

  async deleteEducationExperienceById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.params.userId;
    const id = req.params.id;
    await this.handleRequest(
      req,
      res,
      next,
      () =>
        this.educationExperienceService.deleteEducationExperienceById(
          userId,
          id
        ),
      204
    );
  }

  async getAllEducationExperiencesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.params.userId;
    await this.handleRequest(
      req,
      res,
      next,
      () =>
        this.educationExperienceService.getAllEducationExperiencesByUserId(
          userId
        ),
      200
    );
  }

  async autoCompleteSchoolName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const query = req.params.query;
    await this.handleRequest(
      req,
      res,
      next,
      () => this.educationExperienceService.autoCompleteSchoolName(query),
      200
    );
  }
}

export default EducationExperienceController;
