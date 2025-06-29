import { render, screen } from "@testing-library/react";
import { StaticTag } from "../../../src/components/StaticTag";

describe("StaticTag", () => {
  it("renders the tag text", () => {
    render(<StaticTag text="Current Role" />);
    expect(screen.getByText("Current Role")).toBeInTheDocument();
  });

  it("sets the correct role and ARIA label", () => {
    render(<StaticTag text="Current Role" />);
    const tag = screen.getByRole("note");
    expect(tag).toHaveAttribute("aria-label", "Tag: Current Role");
  });

  it("applies the correct test ID", () => {
    render(<StaticTag text="Current Role" />);
    expect(screen.getByTestId("static-tag-current-role")).toBeInTheDocument();
  });

  it("formats data-testid correctly with lowercase and hyphens", () => {
    render(<StaticTag text="New Feature" />);
    expect(screen.getByTestId("static-tag-new-feature")).toBeInTheDocument();
  });

  it("applies expected styling classes", () => {
    render(<StaticTag text="Test" />);
    const inner = screen.getByText("Test");
    expect(inner).toHaveClass(
      "bg-white",
      "rounded",
      "px-2",
      "border",
      "border-black",
      "font-bold",
      "text-xs",
      "uppercase",
      "tracking-tighter",
      "shadow",
      "text-black"
    );
  });
});
