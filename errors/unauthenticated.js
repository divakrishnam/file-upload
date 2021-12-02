const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
