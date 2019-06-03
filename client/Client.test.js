import Client from "./Client";
import {
  UserInputError,
  AuthenticationError,
  NotFoundError,
  ServerError
} from "../api/errors";
import { ResponseError, marshalGraphQLError } from "./errors";
import { ErrorType } from "../lib/errors";

const __fetch = global.fetch;
const __processError = Client.processError;

describe("request", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
    Client.processError = jest.fn();
  });

  afterAll(() => {
    global.fetch = __fetch;
    Client.processError = __processError;
  });

  it.each([
    // [error validator, fetch resolve or reject, fetch value]
    [
      ErrorType.NETWORK,
      "reject",
      labelObject(new Error("Network error"), "network error")
    ],
    [
      ErrorType.RESPONSE,
      "resolve",
      labelObject({ ok: false, status: 410 }, "bad response")
    ],
    [
      ErrorType.PARSE,
      "resolve",
      labelObject(
        {
          ok: true,
          json: () => Promise.reject(new Error("Syntax error"))
        },
        "bad JSON"
      )
    ]
  ])(
    "returns %s error when fetch %ss with %s",
    async (errorType, resolveOrReject, fetchValue) => {
      expect.assertions(1);

      fetch.mockImplementationOnce(() => Promise[resolveOrReject](fetchValue));

      const { error } = await Client.request();
      expect(error.code).toBe(errorType);
    }
  );

  it("returns the first error in the GraphQL response, if any", async () => {
    expect.assertions(1);

    const errors = [new ServerError()];
    const response = {
      ok: true,
      json: () => Promise.resolve({ errors })
    };
    fetch.mockImplementationOnce(() => Promise.resolve(response));

    const { error } = await Client.request();
    expect(error).toStrictEqual(marshalGraphQLError(errors[0]));
  });
});

describe("processError", () => {
  const prepError = err => labelObject(marshalGraphQLError(err), e => e.code);

  it.each([
    [400, prepError(new UserInputError())],
    [403, prepError(new AuthenticationError())],
    [404, prepError(new NotFoundError())],
    [500, prepError(new ServerError())]
  ])(
    "should set the response status code to %i when error has code %s",
    (code, error) => {
      const res = {
        statusCode: 200
      };

      Client.processError({ error, res });
      expect(res.statusCode).toBe(code);
    }
  );

  it("should set the response status code to the provided status when error is ResponseError", () => {
    const error = new ResponseError("Message", 410);
    const res = {
      statusCode: 200
    };

    Client.processError({ error, res });
    expect(res.statusCode).toBe(error.status);
  });
});

function labelObject(obj, label) {
  obj.toString = () => (typeof label === "function" ? label(obj) : label);
  return obj;
}
