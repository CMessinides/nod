import GraphQL from "./GraphQL";
import { ErrorType } from "./errors";

const __fetch = global.fetch;

describe("Error handling", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    global.fetch = __fetch;
  });

  it.each([
    // [expected error code, fetch resolve or reject, fetch value]
    [
      ErrorType.NETWORK,
      "reject",
      labelObject(new Error("Network error"), "network error")
    ],
    [ErrorType.RESPONSE, "resolve", labelObject({ ok: false }, "bad response")],
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
    ],
    [
      ErrorType.GRAPHQL,
      "resolve",
      labelObject(
        {
          ok: true,
          json: () =>
            Promise.resolve({ errors: [new Error("GraphQL validation error")] })
        },
        "errors in GraphQL response"
      )
    ]
  ])(
    "returns %s when fetch %ss with %s",
    async (expectedErrorCode, resolveOrReject, fetchValue) => {
      expect.assertions(1);

      fetch.mockImplementationOnce(() => Promise[resolveOrReject](fetchValue));

      const { error } = await GraphQL.query();
      expect(error.code).toBe(expectedErrorCode);
    }
  );
});

function labelObject(obj, label) {
  obj.toString = () => label;
  return obj;
}
