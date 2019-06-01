const ErrorType = {
  NETWORK: "client/networkError",
  RESPONSE: "client/responseError",
  PARSE: "client/parseError",
  GRAPHQL: "client/graphqlError"
};

class ClientError extends Error {
  constructor(message, name, code, data) {
    super();
    this.message = message;
    this.name = name;
    this.code = code;
    this.data = data;
  }
}

function NetworkError({
  message = "The API client encountered a network error.",
  error
} = {}) {
  return new ClientError(message, "NetworkError", ErrorType.NETWORK, { error });
}

function ResponseError({
  message = "The API client received an error response from the server.",
  response
} = {}) {
  return new ClientError(message, "ResponseError", ErrorType.RESPONSE, {
    response
  });
}

function ParseError({
  message = "The API client could not parse the server response as JSON.",
  error
} = {}) {
  return new ClientError(message, "ParseError", ErrorType.PARSE, { error });
}

function GraphQLError({
  message = "The API client received errors in the `errors` field of the server response.",
  errors = []
} = {}) {
  return new ClientError(message, "GraphQLError", ErrorType.GRAPHQL, {
    errors
  });
}

module.exports = {
  ErrorType,
  NetworkError,
  ResponseError,
  ParseError,
  GraphQLError
};
