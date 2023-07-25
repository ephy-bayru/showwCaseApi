import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.util";
import CustomError from "../error/CustomError";
import { CustomMongoError } from "../error/customMongoError";

const handleCustomError = (err: CustomError): CustomError => err;

const handleMongoError = (err: Error): CustomError => new CustomMongoError(err);

const handleUnexpectedError = (err: Error): CustomError => {
  logger.error(`Unexpected error occurred: ${err.message}`, err);
  return new CustomError(
    500,
    err.message,
    "An error occurred while processing the request"
  );
};

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let customError: CustomError;

  if (err instanceof CustomError) {
    customError = handleCustomError(err);
  } else if (err.message.includes("E11000")) {
    customError = handleMongoError(err);
  } else {
    customError = handleUnexpectedError(err);
  }

  logger.error(
    `Error occurred while handling request: ${customError.message}`,
    {
      error: customError,
      request: {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
      },
    }
  );
  customError.sendErrorResponse(res);
};

export default errorMiddleware;
