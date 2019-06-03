import config from "../config/api.config";
import { ErrorType } from "../lib/errors";
import {
  NetworkError,
  ResponseError,
  ParseError,
  marshalGraphQLError
} from "./errors";

async function fetchGraphQL(query, variables, options) {
  try {
    const { headers, ...otherOpts } = options;
    return await fetch(config.url, {
      ...otherOpts,
      headers: Object.assign({}, headers, {
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify({
        query,
        variables: variables ? variables : undefined
      })
    });
  } catch (error) {
    throw new NetworkError(error.message);
  }
}

function ensureGraphQLResponseOK(response) {
  if (!response.ok) {
    throw new ResponseError(
      "API client received bad response from server",
      response.status
    );
  }
}

async function parseGraphQLResponse(response) {
  try {
    return await response.json();
  } catch (error) {
    throw new ParseError(error.message);
  }
}

export default {
  async request({ query, variables, res, options = {} } = {}) {
    const result = {
      data: {},
      error: null
    };

    try {
      const response = await fetchGraphQL(query, variables, options);
      ensureGraphQLResponseOK(response);
      const { data, errors } = await parseGraphQLResponse(response);
      result.data = data;
      if (errors) {
        throw marshalGraphQLError(errors[0]);
      }
    } catch (error) {
      this.processError({ error, res });
      result.error = error;
    }

    return result;
  },
  processError({ error, res }) {
    if (!error || !error.code || !res) return;

    switch (error.code) {
      case ErrorType.USER_INPUT:
        res.statusCode = 400;
        break;
      case ErrorType.AUTHENTICATION:
        res.statusCode = 403;
        break;
      case ErrorType.NOT_FOUND:
        res.statusCode = 404;
        break;
      case ErrorType.SERVER:
        res.statusCode = 500;
        break;
      case ErrorType.RESPONSE:
        res.statusCode = error.status;
        break;
    }
  }
};
