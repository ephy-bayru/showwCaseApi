import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { BlacklistedTokenModel } from "../data/interfaces/blacklistedTokenModel";
import { CustomRequest } from "./customRequest";
import CustomError from "../../../error/CustomError";
import UserModel from "../../users/data/schemas/UserModel";
import { UserRole } from "../../users/data/interfaces/IUser";

interface TokenPayload {
  id: string;
  role: UserRole;
}

async function checkIfTokenIsBlacklisted(token: string): Promise<boolean> {
  const tokenEntry = await BlacklistedTokenModel.findOne({ token });
  return !!tokenEntry;
}

export async function authenticate(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new CustomError(
        401,
        "Unauthorized",
        "No authorization header provided"
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new CustomError(401, "Unauthorized", "No token provided");
    }

    const jwtSecret = process.env.JWT_SECRET || process.env.ACCESS_TOKEN_SECRET;

    if (!jwtSecret) {
      throw new CustomError(400, "Bad Request", "JWT_SECRET is not set");
    }

    const decoded = jwt.verify(token, jwtSecret) as unknown as TokenPayload;

    const isTokenBlacklisted = await checkIfTokenIsBlacklisted(token);
    if (isTokenBlacklisted) {
      throw new CustomError(401, "Unauthorized", "Token is blacklisted");
    }

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      throw new CustomError(401, "Unauthorized", "User not found");
    }

    if (user.suspended) {
      throw new CustomError(403, "Forbidden", "User account is suspended");
    }

    // Add user suspension check here
    // if (user.suspended) {
    //   throw new CustomError(403, "Forbidden", "User account is suspended");
    // }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
