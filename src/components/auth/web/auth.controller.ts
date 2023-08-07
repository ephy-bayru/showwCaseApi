import { comparePasswords } from "../../../helpers/passwordHash";
import { IAuthPayload } from "../data/interfaces/IAuth";
import { CustomRequest } from "../middlewares/customRequest";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlewares/tokenHandler";
import { AuthService } from "../services/auth.service";
import ResponseHandler from "../../../helpers/httpResponse.helper";
import { Response, NextFunction, Request } from "express";
import CustomError from "../../../error/CustomError";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
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

  public login(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.handleRequest(
      req,
      res,
      next,
      async () => {
        const { email, password } = req.body;
        const user = await this.authService.getUserByEmail(email);

        if (user && (await comparePasswords(password, user.password))) {
          const userPayload: IAuthPayload = {
            _id: user._id,
            email: user.email,
            role: user.role,
          };

          const accessToken = generateAccessToken(userPayload);
          const refreshToken = generateRefreshToken(userPayload);

          return {
            user: {
              id: user._id,
              email: user.email,
              role: user.role,
            },
            accessToken,
            refreshToken,
          };
        }

        throw new CustomError(401, "Invalid email or password", "Unauthorized");
      },
      200
    );
  }

  public refreshToken(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    return this.handleRequest(
      req,
      res,
      next,
      async () => {
        if (!req.user) {
          throw new CustomError(
            401,
            "Invalid or expired refresh token",
            "Unauthorized"
          );
        }

        const user: IAuthPayload = req.user;

        const accessToken = generateAccessToken(user);

        return { accessToken };
      },
      200
    );
  }
}
