import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import LoginPage from "./page";
import { toast } from "sonner";

const mockPush = jest.fn();
const mockLogin = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
}));

jest.mock("@//hooks", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@//components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("@//components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock("@//components/ui/checkbox", () => ({
  Checkbox: ({ ...props }: any) => (
    <input
      type="checkbox"
      role="checkbox"
      defaultChecked={props.defaultChecked}
      {...props}
    />
  ),
}));

describe("Login Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login page", () => {
    render(<LoginPage />);

    expect(screen.getByText("Welcome back")).toBeInTheDocument();

    expect(
      screen.getByText("Sign in to your AI-HRMS account")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("you@company.com")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("••••••••")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("shows default values", () => {
    render(<LoginPage />);

    expect(
      screen.getByDisplayValue("admin@aihrms.com")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("password123")
    ).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();

    render(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText(
      "••••••••"
    ) as HTMLInputElement;

    expect(passwordInput.type).toBe("password");

    const toggleButton = screen.getAllByRole("button")[0];

    await user.click(toggleButton);

    expect(passwordInput.type).toBe("text");
  });

  it("logs in successfully", async () => {
    const user = userEvent.setup();

    mockLogin.mockResolvedValueOnce({});

    render(<LoginPage />);

    const email = screen.getByPlaceholderText("you@company.com");
    const password = screen.getByPlaceholderText("••••••••");

    await user.clear(email);
    await user.type(email, "admin@aihrms.com");

    await user.clear(password);
    await user.type(password, "password123");

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        "admin@aihrms.com",
        "password123"
      );
    });

    expect(toast.success).toHaveBeenCalledWith("Welcome back!");

    expect(mockPush).toHaveBeenCalledWith("/admin/dashboard");
  });

  it("shows error when login fails", async () => {
    const user = userEvent.setup();

    mockLogin.mockRejectedValueOnce(new Error("Invalid"));

    render(<LoginPage />);

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Login failed. Please try again."
      );
    });
  });

  it("contains forgot password link", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("link", {
        name: /forgot password/i,
      })
    ).toBeInTheDocument();
  });

  it("renders remember me checkbox", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("checkbox")
    ).toBeInTheDocument();
  });

  // it("disables submit button while logging in", async () => {
  //   const user = userEvent.setup();

  //   mockLogin.mockImplementation(
  //     () =>
  //       new Promise((resolve) =>
  //         setTimeout(resolve, 100)
  //       )
  //   );

  //   render(<LoginPage />);

  //   const button = screen.getByRole("button", {
  //     name: /sign in/i,
  //   });

  //   await user.click(button);

  //   expect(
  //     screen.getByRole("button", {
  //       name: /signing in/i,
  //     })
  //   ).toBeDisabled();
  // });
});