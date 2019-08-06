import React from "react";
import ClientOnly from "./ClientOnly";
import { render, cleanup } from "@testing-library/react";
import { renderToString } from "react-dom/server";

describe("when on server", () => {
	it("should render nothing", () => {
		const ssr = renderToString(<ClientOnly>Hello world!</ClientOnly>);
		expect(ssr).toBe("");
	});
});

describe("when in the browser", () => {
	afterEach(cleanup);

	it("should render its children on the client", () => {
		const { queryByText } = render(<ClientOnly>Hello world!</ClientOnly>);

		expect(queryByText("Hello world!")).not.toBe(null);
	});
});
