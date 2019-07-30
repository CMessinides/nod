import React from "react";
import Link from "./Link";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("should render", () => {
  const { container } = render(<Link page="/books">All books</Link>);
  expect(container.firstChild).toMatchSnapshot();
});

it("should format a dynamic link with parameters", () => {
  const { container } = render(
    <Link page="/book" pattern="/books/:id" params={{ id: 12 }}>
      Book 12
    </Link>
  );
  expect(container.firstChild).toMatchSnapshot();
});
