import CustomError from './CustomError';
import { MONGO_ERROR_CODES, MONGO_ERROR_MESSAGES } from '../constants/mongoErrorMessages';

const ERROR_CODE_MAP = {
  [MONGO_ERROR_CODES.DUPLICATE_KEY_ERROR]: { status: 409, message: MONGO_ERROR_MESSAGES.DUPLICATE_KEY_ERROR },
  [MONGO_ERROR_CODES.FAILED_VALIDATION]: { status: 400, message: MONGO_ERROR_MESSAGES.FAILED_VALIDATION },
  [MONGO_ERROR_CODES.INSUFFICIENT_PERMISSIONS]: { status: 403, message: MONGO_ERROR_MESSAGES.INSUFFICIENT_PERMISSIONS },
  [MONGO_ERROR_CODES.BAD_VALUE]: { status: 400, message: MONGO_ERROR_MESSAGES.BAD_VALUE },
  [MONGO_ERROR_CODES.CONNECTION_TIMED_OUT]: { status: 503, message: MONGO_ERROR_MESSAGES.CONNECTION_TIMED_OUT },
  [MONGO_ERROR_CODES.OPERATION_INTERRUPTED]: { status: 503, message: MONGO_ERROR_MESSAGES.OPERATION_INTERRUPTED },
  [MONGO_ERROR_CODES.CANNOT_CREATE_COLLECTION]: { status: 400, message: MONGO_ERROR_MESSAGES.CANNOT_CREATE_COLLECTION },
};

export class CustomMongoError extends CustomError {
  constructor(err: any) {
    const { status, message, userMessage } =
      extractErrorDetails(err);
    super(status, message, userMessage);
  }
}

function extractErrorDetails(err: any): {
  status: number;
  message: string;
  userMessage: string;
} {
  let message = err.message || "";
  let status = 500;
  let userMessage = MONGO_ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

  const errorDetails = ERROR_CODE_MAP[err.code];
  if (errorDetails) {
    status = errorDetails.status;
    userMessage = errorDetails.message;
  }
  
  if (err.code === MONGO_ERROR_CODES.DUPLICATE_KEY_ERROR) {
    ({ message, userMessage } = handleDuplicateKeyError(message));
  }

  return { status, message, userMessage };
}

function handleDuplicateKeyError(message: string): {
  message: string;
  userMessage: string;
} {
  let field = "";
  let value = "";

  const errorMessageMatch = message.match(
    /E11000 duplicate key error collection:.* index: (\w+).*dup key: { (.*): "(.*?)" }/
  );
  if (errorMessageMatch) {
    field = errorMessageMatch[2] ? errorMessageMatch[2] : "";
    value = errorMessageMatch[3] ? errorMessageMatch[3] : "";
  }

  return {
    message: `Error in createUser: ${message}`,
    userMessage: `A user with ${field} '${value}' already exists`,
  };
}