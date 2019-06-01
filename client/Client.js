import config from "../config/api.config";
import {
  NetworkError,
  ResponseError,
  ParseError,
  GraphQLError
} from "./errors";

export default {
  async request({ query, variables, options = {} } = {}) {
    const result = {
      data: {},
      error: null
    };

    let response;
    try {
      const { headers, ...otherOpts } = options;
      response = await fetch(config.url, {
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
      result.error = NetworkError({ error });
      return result;
    }

    if (!response.ok) {
      result.error = ResponseError({ response });
      return result;
    }

    let data, errors;
    try {
      ({ data, errors } = await response.json());
    } catch (error) {
      result.error = ParseError({ error });
      return result;
    }

    result.data = data;

    if (errors) {
      result.error = GraphQLError({ errors });
    }

    return result;
  }
};
