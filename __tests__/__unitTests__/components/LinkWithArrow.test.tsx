import { render, screen } from "@testing-library/react";
import { LinkWithArrow } from "../../../src/components/LinkWithArrow";
import userEvent from "@testing-library/user-event";

describe("LinkWithArrow", () => {
  const href = "https://example.com";

  it("renders the children correctly", () => {
    render(<LinkWithArrow href={href}>Visit Site</LinkWithArrow>);
    expect(screen.getByText("Visit Site")).toBeInTheDocument();
  });

  it("sets the correct href attribute", () => {
    render(<LinkWithArrow href={href}>Link</LinkWithArrow>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", href);
  });

  it("applies custom class names", () => {
    render(
      <LinkWithArrow href={href} className="custom-class">
        Link
      </LinkWithArrow>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });

  it("applies the default data-testid", () => {
    render(<LinkWithArrow href={href}>Link</LinkWithArrow>);
    expect(screen.getByTestId("link-with-arrow")).toBeInTheDocument();
  });

  it("uses the provided data-testid", () => {
    render(
      <LinkWithArrow href={href} testId="custom-id">
        Link
      </LinkWithArrow>
    );
    expect(screen.getByTestId("custom-id")).toBeInTheDocument();
  });

  it("applies the fallback aria-label when children is a string", () => {
    render(<LinkWithArrow href={href}>Docs</LinkWithArrow>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label", "Docs (opens in new tab)");
  });

  it("applies the custom aria-label if provided", () => {
    render(
      <LinkWithArrow href={href} ariaLabel="Custom label">
        Docs
      </LinkWithArrow>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label", "Custom label");
  });

  it("sets title when children is string", () => {
    render(<LinkWithArrow href={href}>Docs</LinkWithArrow>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("title", "Docs (opens in new tab)");
  });

  it("renders the arrow icon SVG", () => {
    render(<LinkWithArrow href={href}>Docs</LinkWithArrow>);
    const svg = screen.getByRole("link").querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });

  it("supports user interaction (click)", async () => {
    const user = userEvent.setup();
    render(<LinkWithArrow href={href}>Click Me</LinkWithArrow>);
    const link = screen.getByRole("link");
    await user.click(link);
    // no-op assertion here; in real cases we might mock window.open or use a click handler
    expect(link).toHaveAttribute("href", href);
  });
});
