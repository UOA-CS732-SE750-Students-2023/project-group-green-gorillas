import React from "react";
import { render } from "@testing-library/react";
import { LoadingIndicator } from "../index";

describe("LoadingIndicator", () => {
  it("should be render correctly", () => {
    const { container } = render(<LoadingIndicator />);

    expect(container).toMatchSnapshot();
  });
});
