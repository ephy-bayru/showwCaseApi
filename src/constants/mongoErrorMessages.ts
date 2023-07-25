export const MONGO_ERROR_MESSAGES = {
    DUPLICATE_KEY_ERROR: "A user with this attribute already exists",
    FAILED_VALIDATION: "Failed validation on database. Please check the data you are sending",
    INSUFFICIENT_PERMISSIONS: "You do not have the necessary permissions for the requested operation",
    BAD_VALUE: "There was a bad value. Please check the data you're sending",
    CONNECTION_TIMED_OUT: "The connection to the database timed out. Please try again later",
    OPERATION_INTERRUPTED: "The operation was interrupted due to shutdown. Please try again",
    CANNOT_CREATE_COLLECTION: "Cannot create collection. Please check your request and try again",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
};

export const MONGO_ERROR_CODES = {
  DUPLICATE_KEY_ERROR: 11000,
  FAILED_VALIDATION: 121,
  INSUFFICIENT_PERMISSIONS: 13,
  BAD_VALUE: 2,
  CONNECTION_TIMED_OUT: 89,
  OPERATION_INTERRUPTED: 11600,
  CANNOT_CREATE_COLLECTION: 67,
};
