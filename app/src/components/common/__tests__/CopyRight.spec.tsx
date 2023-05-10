import React from "react";
import { render } from "@testing-library/react";
import { CopyRight } from "../CopyRight";

describe("CopyRight", () => {
  beforeAll(() => {
    Date.prototype.getFullYear = jest.fn().mockReturnValue(2000);
  });

  it("should be render correctly", () => {
    const { container } = render(<CopyRight />);

    expect(container).toMatchSnapshot();
  });
});
