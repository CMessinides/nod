const { ErrorType } = require("../lib/errors");

class BaseError extends Error {
  constructor(message, code, properties) {
    super(message);
    this.code = code;

    if (properties) {
      Object.keys(properties).forEach(key => {
        this[key] = properties[key];
      });
    }

    if (!this.name) {
      Object.defineProperty(this, "name", { value: "BaseError" });
    }
  }
}

class NetworkError extends BaseError {
  constructor(message) {
    super(message, ErrorType.NETWORK);

    Object.defineProperty(this, "name", { value: "NetworkError" });
  }
}

class ResponseError extends BaseError {
  constructor(message, status) {
    super(message, ErrorType.RESPONSE, { status });

    Object.defineProperty(this, "name", { value: "ResponseError" });
  }
}

class ParseError extends BaseError {
  constructor(message) {
    super(message, ErrorType.PARSE);
  }
}

function marshalGraphQLError(error) {
  const code = error.extensions.code || ErrorType.SERVER;
  return new BaseError(error.message, code, {
    ...error.extensions,
    status: error.extensions.exception && error.extensions.exception.status
  });
}

module.exports = {
  BaseError,
  NetworkError,
  ResponseError,
  ParseError,
  marshalGraphQLError
};
