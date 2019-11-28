export class AppError extends Error {

  constructor(message, data = null, statusCode = 400, isOperational = true) {
    super(message);
    Error.captureStackTrace(this, AppError);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.data = data;
  }

}