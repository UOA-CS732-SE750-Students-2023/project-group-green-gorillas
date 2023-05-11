jest.mock("../../utils/AuthenticationRedirect", () => ({
  AuthenticationRedirect: ({ children }: any) => children,
}));

jest.mock("../../../../hooks/useSignIn", () => ({
  useSignIn: jest.fn().mockReturnValue({
    onSignIn: jest.fn(),
    error: "",
    isLoading: false,
  }),
}));

jest.mock("../../index", () => ({
  ScreenPath: {
    ForgotPassword: "forgot-password",
  },
}));

import { LoginScreen } from "../index";
import { act, render } from "@testing-library/react";
import { useSignIn } from "../../../../hooks/useSignIn";
import userEvent from "@testing-library/user-event";

describe("Login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    localStorage.setItem("rememberMe", "false");
  });

  it("should be able to render correctly", () => {
    const { container } = render(<LoginScreen />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to see loading text on submit button if user is signing in", async () => {
    (useSignIn as jest.Mock).mockReturnValue({
      onSignIn: jest.fn(),
      error: "",
      isLoading: true,
    });

    const { getByText } = await render(<LoginScreen />);

    expect(() => getByText("Loading ...")).not.toThrow();
  });

  it("should be able to see sign in text on submit button if user is not signed in", () => {
    (useSignIn as jest.Mock).mockReturnValue({
      onSignIn: jest.fn(),
      error: "",
      isLoading: false,
    });

    const { getByText } = render(<LoginScreen />);

    expect(() => getByText("Sign In")).not.toThrow();
  });

  it("should be able to render error if the useSignIn hook returns error", () => {
    (useSignIn as jest.Mock).mockReturnValue({
      onSignIn: jest.fn(),
      error: "Something went wrong",
      isLoading: false,
    });

    const { getByText } = render(<LoginScreen />);

    expect(() => getByText("Something went wrong")).not.toThrow();
  });

  it("should be able to click sign in", async () => {
    const onSignInMock = jest.fn();
    (useSignIn as jest.Mock).mockReturnValue({
      onSignIn: onSignInMock,
      error: "",
      isLoading: false,
    });

    const { container, getByText } = render(<LoginScreen />);

    const email = "sden406@aucklanduni.ac.nz";
    const password = "123456";

    await act(async () => {
      await userEvent.type(
        container.querySelector("#email") as HTMLInputElement,
        email
      );

      await userEvent.type(
        container.querySelector("#password") as HTMLInputElement,
        password
      );

      await userEvent.click(getByText("Sign In"));
    });

    expect(onSignInMock).toHaveBeenCalledTimes(1);
    expect(onSignInMock).toHaveBeenCalledWith(email, password, false);
  });

  it("should render correct redirect password url", async () => {
    const { getByText } = render(<LoginScreen />);

    expect((getByText("Forgot password?") as any)?.href).toBe(
      "http://localhost/forgot-password"
    );
  });
});
