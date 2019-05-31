const config = require("../config/api.config");
import {
  NetworkError,
  ResponseError,
  ParseError,
  GraphQLError
} from "./errors";

const defaultFetchOpts = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
};

export default {
  async query(query) {
    return await this.fetchGraphQL({ query });
  },
  async fetchGraphQL(body, opts = {}) {
    const result = {
      data: {},
      error: null
    };

    let response;
    try {
      response = await fetch(config.url, {
        ...defaultFetchOpts,
        ...opts,
        body: JSON.stringify(body)
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
