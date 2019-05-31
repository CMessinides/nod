const ErrorType = {
  NETWORK: "client/networkError",
  RESPONSE: "client/responseError",
  PARSE: "client/parseError",
  GRAPHQL: "client/graphqlError"
};

function NetworkError({
  message = "The API client encountered a network error.",
  error
} = {}) {
  return createError(message, "NetworkError", ErrorType.NETWORK, { error });
}

function ResponseError({
  message = "The API client received an error response from the server.",
  response
} = {}) {
  return createError(message, "ResponseError", ErrorType.RESPONSE, {
    response
  });
}

function ParseError({
  message = "The API client could not parse the server response as JSON.",
  error
} = {}) {
  return createError(message, "ParseError", ErrorType.PARSE, { error });
}

function GraphQLError({
  message = "The API client received errors in the `errors` field of the server response.",
  errors = []
} = {}) {
  return createError(message, "GraphQLError", ErrorType.GRAPHQL, { errors });
}

function createError(message, name, code, data = {}) {
  const error = Error(message);
  error.name = name;
  error.code = code;
  error.data = data;
  return error;
}

module.exports = {
  ErrorType,
  NetworkError,
  ResponseError,
  ParseError,
  GraphQLError
};