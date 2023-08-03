import { Request, Response, NextFunction } from "express";
import { IUser } from "../data/interfaces/IUser";
import UsersService from "../services/users.service";
import CustomError from "../../../error/CustomError";
import ResponseHandler from "../../../helpers/httpResponse.helper";
import {
  getPaginationMetadata,
  getPaginationOptions,
} from "../../../helpers/pagination.helper";
import { IPaginationOptions } from "../../../interfaces/IPaginationOptions";
import { validateUser } from "./validation/user.validation";

class UsersController {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
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

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user: IUser = req.body;
    const validationResults = validateUser(user);

    if (validationResults.error) {
      throw new CustomError(
        400,
        validationResults.error.details[0].message,
        "Invalid data provided for user creation"
      );
    }

    await this.handleRequest(
      req,
      res,
      next,
      () => this.usersService.createUser(user),
      201
    );
  }

  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const params = { id: req.params.id };
    await this.handleRequest(
      req,
      res,
      next,
      () => this.usersService.getUserById(params),
      200
    );
  }

  async updateUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const params = {
      id: req.params.id,
      user: req.body as Partial<IUser>,
    };
    const validationResults = validateUser(params.user);

    if (validationResults.error) {
      throw new CustomError(
        400,
        validationResults.error.details[0].message,
        "Invalid data provided for user update"
      );
    }

    await this.handleRequest(
      req,
      res,
      next,
      () => this.usersService.updateUserById(params),
      200
    );
  }

  async deleteUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const params = { id: req.params.id };
    await this.handleRequest(
      req,
      res,
      next,
      () => this.usersService.deleteUserById(params),
      204
    );
  }

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const paginationOptions: IPaginationOptions<IUser> =
      getPaginationOptions(req);
    await this.handleRequest(
      req,
      res,
      next,
      async () => {
        const paginatedUsers = await this.usersService.getUsers(
          paginationOptions
        );
        const paginationData = getPaginationMetadata(
          paginationOptions,
          paginatedUsers.totalCount
        );
        return { users: paginatedUsers, pagination: paginationData };
      },
      200
    );
  }

  async searchUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const searchQuery = req.params.query;
    const paginationOptions: IPaginationOptions<IUser> =
      getPaginationOptions(req);
    await this.handleRequest(
      req,
      res,
      next,
      async () => {
        const paginatedUsers = await this.usersService.searchUsers(
          searchQuery,
          paginationOptions
        );
        const paginationData = getPaginationMetadata(
          paginationOptions,
          paginatedUsers.totalCount
        );
        return { users: paginatedUsers, pagination: paginationData };
      },
      200
    );
  }
}

export default UsersController;
