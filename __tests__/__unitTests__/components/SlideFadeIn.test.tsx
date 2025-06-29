import { render, screen } from "@testing-library/react";
import { SlideFadeIn } from "../../../src/components/SlideFadeIn";
import { useInView } from "react-intersection-observer";

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

const startMock = jest.fn();
jest.mock("framer-motion", () => {
  const original = jest.requireActual("framer-motion");
  return {
    ...original,
    useAnimation: () => ({
      start: jest.fn(),
      subscribe: jest.fn(),
    }),
  };
});

describe("SlideFadeIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children", () => {
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<SlideFadeIn>Visible Content</SlideFadeIn>);
    expect(screen.getByText("Visible Content")).toBeInTheDocument();
  });

  it("accepts and applies custom className", () => {
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<SlideFadeIn className="test-class">Text</SlideFadeIn>);
    expect(screen.getByText("Text").parentElement).toHaveClass("test-class");
  });

  it("applies the data-testid correctly", () => {
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<SlideFadeIn data-testid="slide-test">Test</SlideFadeIn>);
    expect(screen.getByTestId("slide-test")).toBeInTheDocument();
  });

  it("applies the aria-label and role only when aria-label is provided", () => {
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<SlideFadeIn ariaLabel="slide section">Test</SlideFadeIn>);
    const el = screen.getByText("Test").parentElement;
    expect(el).toHaveAttribute("aria-label", "slide section");
    expect(el).toHaveAttribute("role", "region");
  });

  it("does not set role if aria-label is not provided", () => {
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<SlideFadeIn>Test</SlideFadeIn>);
    const el = screen.getByText("Test").parentElement;
    expect(el).not.toHaveAttribute("role");
  });

  it("calls controls.start('visible') when inView becomes true", () => {
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    render(<SlideFadeIn>Animate Me</SlideFadeIn>);
    expect(startMock).toHaveBeenCalledWith("visible");
  });

  it("does not call controls.start if inView is false", () => {
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<SlideFadeIn>Don’t Animate Me</SlideFadeIn>);
    expect(startMock).not.toHaveBeenCalled();
  });
});
