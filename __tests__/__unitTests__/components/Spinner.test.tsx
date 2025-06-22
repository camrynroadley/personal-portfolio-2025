import { render, screen } from "@testing-library/react";
import { Spinner } from "../../../src/components/Spinner";

describe("Spinner", () => {
  it("renders the spinner with correct classes", () => {
    render(<Spinner />);

    const spinnerWrapper = screen.getByTestId("spinner-wrapper");
    expect(spinnerWrapper).toBeInTheDocument();
    expect(spinnerWrapper).toHaveClass(
      "h-[100vh]",
      "flex",
      "items-center",
      "justify-center"
    );
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      "w-6",
      "h-6",
      "border-4",
      "border-black",
      "border-t-transparent",
      "rounded-full",
      "animate-spin"
    );
  });
});
