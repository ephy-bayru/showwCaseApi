import jwt from "jsonwebtoken";
import { IAuthPayload } from "../data/interfaces/IAuth";
import CustomError from "../../../error/CustomError";

interface TokenPayload {
  id: string;
  role: string;
}

function ensureDefined(
  value: string | undefined,
  errorMessage: string
): string {
  if (value === undefined) {
    throw new CustomError(500, "Server Configuration Error", errorMessage);
  }
  return value;
}

export function generateAccessToken(user: IAuthPayload): string {
  if (!user._id) {
    throw new CustomError(
      400,
      "User ID is missing",
      "User ID must be provided to generate an access token"
    );
  }

  if (!user.role) {
    throw new CustomError(
      400,
      "User role is missing",
      "User role must be provided to generate an access token"
    );
  }

  const payload: TokenPayload = {
    id: user._id.toString(),
    role: user.role,
  };

  const secret = ensureDefined(
    process.env.ACCESS_TOKEN_SECRET,
    "Access token secret is not set"
  );
  const expiresIn = ensureDefined(
    process.env.ACCESS_TOKEN_EXPIRES_IN,
    "Access token expiration time is not set"
  );

  return jwt.sign(payload, secret, { expiresIn });
}

export function generateRefreshToken(user: IAuthPayload): string {
  if (!user._id || !user.role) {
    throw new CustomError(
      400,
      "Invalid user data",
      "Invalid user data for generating refresh token"
    );
  }

  const payload: TokenPayload = {
    id: user._id.toString(),
    role: user.role,
  };

  const secret = ensureDefined(
    process.env.REFRESH_TOKEN_SECRET,
    "Refresh token secret is not set"
  );
  const expiresIn = ensureDefined(
    process.env.REFRESH_TOKEN_EXPIRES_IN,
    "Refresh token expiration time is not set"
  );

  return jwt.sign(payload, secret, { expiresIn });
}

export function generateResetToken(user: IAuthPayload): string {
  if (!user._id || !user.role) {
    throw new CustomError(
      400,
      "Invalid user data",
      "Invalid user data for generating reset token"
    );
  }

  const payload: TokenPayload = {
    id: user._id.toString(),
    role: user.role,
  };

  const secret = ensureDefined(
    process.env.RESET_TOKEN_SECRET,
    "Reset token secret is not set"
  );
  const expiresIn = ensureDefined(
    process.env.RESET_TOKEN_EXPIRES_IN,
    "Reset token expiration time is not set"
  );

  return jwt.sign(payload, secret, { expiresIn });
}
