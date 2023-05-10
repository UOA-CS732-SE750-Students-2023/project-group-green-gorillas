jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: "team",
  }),
}));

import React from "react";
import { render } from "@testing-library/react";
import { LeftNavBar } from "../index";

describe("LeftNavBar", () => {
  it("should be render correctly", () => {
    const { container } = render(<LeftNavBar />);

    expect(container).toMatchSnapshot();
  });
});
