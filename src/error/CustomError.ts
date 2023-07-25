import { Response } from 'express';
import ResponseHandler from '../helpers/httpResponse.helper';

class CustomError extends Error {
  status: number;
  userMessage: string;
  details?: string;

  constructor(
    status: number,
    message: string,
    userMessage: string,
    details?: string
  ) {
    super(message);
    this.status = status;
    this.userMessage = userMessage;
    this.details = details;
  }

  toJSON() {
    return {
      message: this.message,
      userMessage: this.userMessage,
      details: this.details,
    };
  }

  sendErrorResponse(res: Response): void {
    ResponseHandler.send(
      res,
      this.status,
      null,
      this.userMessage,
      this.details
    );
  }
}

export default CustomError;
