import React from "react";
import CanError from "./CanError";
import { render, cleanup } from "react-testing-library";

afterEach(cleanup);

it("should render its children if no error", () => {
  const { container } = render(
    <CanError>{() => <p>No errors here!</p>}</CanError>
  );
  expect(container.firstChild).toMatchSnapshot();
});

it("should render a 500 error page if passed an error", () => {
  const { container } = render(
    <CanError error={{ message: "foo" }}>
      {() => <p>This shouldn&rsquo;t render!</p>}
    </CanError>
  );
  expect(container.firstChild).toMatchSnapshot();
});

it("should use the error's status code if present", () => {
  const { container } = render(
    <CanError error={{ status: 400 }}>
      {() => <p>This shouldn&rsquo;t render!</p>}
    </CanError>
  );
  expect(container.firstChild).toMatchSnapshot();
});
