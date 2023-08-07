import { Response, NextFunction } from "express";
import { Permission, rolePermissions } from "../../../config/permissions";
import { CustomRequest } from "./customRequest";
import { IAuthPayload } from "../data/interfaces/IAuth";
import CustomError from "../../../error/CustomError";

export function authorize(...requiredPermissions: Permission[]) {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new CustomError(401, "Unauthorized", "Unauthorized");
    }

    const user: IAuthPayload = req.user;

    // Get permissions of the user's role
    const userPermissions = user.role ? rolePermissions[user.role] : [];

    // Check if the user has all required permissions
    const hasRequiredPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasRequiredPermissions) {
      throw new CustomError(403, "Forbidden", "Forbidden");
    }

    next();
  };
}
