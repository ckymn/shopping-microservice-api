class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
    this.message = message;
  }
}

module.exports = ApiError;
