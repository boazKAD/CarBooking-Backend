export const globalErrorHandler = (err, req, res, next) => {
  // Default error status and message
  let statusCode = 500;
  let message = "Internal Server Error";

  // Check if the error is a known error type
  if (err instanceof CustomError) {
    statusCode = err.statusCode || 500;
    message = err.message || "Internal Server Error!";
  }

  // Log the error for debugging purposes
  console.error(err);

  // Send the error response
  return res.status(statusCode).json({ error: message });
};

// Custom error class to define specific error types
export class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

//   module.exports = { globalErrorHandler, CustomError };
