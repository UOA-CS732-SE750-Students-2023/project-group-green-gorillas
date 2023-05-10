import React from "react";
import { render } from "@testing-library/react";
import { Avatar } from "../index";

describe("Avatar", () => {
  it("should be render correctly", () => {
    const { container } = render(<Avatar text={"Oliver Deng"} />);

    expect(container).toMatchSnapshot();
  });
});
