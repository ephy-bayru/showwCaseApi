import { Response } from "express";
import logger from "../utils/logger.util";

interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
  errors?: any;
  metadata?: {
    timestamp: string;
  };
}

class ResponseHandler {
  private static statusMessages: { [key: number]: string } = {
    200: "OK",
    201: "Created",
    202: "Accepted",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Internal Server Error",
  };

  private static getStatusMessage(statusCode: number): string {
    return this.statusMessages[statusCode] || "Error";
  }

  private static prepareResponse<T>(
    statusCode: number,
    data?: T,
    message?: string,
    errors: any[] = []
  ): ApiResponse<T> {
    const status = this.getStatusMessage(statusCode);

    const response: ApiResponse<T> = {
      status,
      message: message || "",
      errors: errors.length ? errors : undefined,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };

    if (data) {
      response.data = data;
    }

    return response;
  }

  private static logMessage(
    statusCode: number,
    message?: string,
    errors?: any
  ): void {
    if (statusCode >= 200 && statusCode < 300) {
      logger.info(`Success: ${message}`);
    }
    if (statusCode >= 400) {
      logger.error(`Error: ${message}`, errors);
    }
  }

  private static formatErrors(errors: any): any[] {
    if (Array.isArray(errors)) {
      return errors;
    }
    return errors ? [errors] : [];
  }

  public static send<T>(
    res: Response,
    statusCode: number,
    data?: T,
    message?: string,
    errors?: any
  ): Response {
    const formattedErrors = this.formatErrors(errors);
    const response = this.prepareResponse<T>(
      statusCode,
      data,
      message,
      formattedErrors
    );

    this.logMessage(statusCode, message, errors);

    return res.status(statusCode).json(response);
  }
}

export default ResponseHandler;
