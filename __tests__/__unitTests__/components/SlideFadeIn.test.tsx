/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { SlideFadeIn } from "../../../src/components/SlideFadeIn";
import { act } from "react-dom/test-utils";

const startMock = jest.fn();

jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    motion: {
      div: (props: any) => <div {...props} />, // simulate motion.div as regular div
    },
    useAnimation: () => ({
      start: startMock,
    }),
  };
});

let mockInView = false;

jest.mock("react-intersection-observer", () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: mockInView,
  }),
}));

describe("SlideFadeIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockInView = false;
  });

  it("accepts and applies custom className", () => {
    render(<SlideFadeIn className="test-class">Text</SlideFadeIn>);
    const el = screen.getByText("Text");
    expect(el).toHaveClass("test-class");
  });

  it("applies the data-testid correctly", () => {
    render(<SlideFadeIn data-testid="slide-in">Hello</SlideFadeIn>);
    expect(screen.getByTestId("slide-in")).toBeInTheDocument();
  });

  it("applies the aria-label and role only when aria-label is provided", () => {
    render(<SlideFadeIn ariaLabel="slide section">Test</SlideFadeIn>);
    const el = screen.getByText("Test");
    expect(el).toHaveAttribute("aria-label", "slide section");
    expect(el).toHaveAttribute("role", "region");
  });

  it("does not apply role if aria-label is missing", () => {
    render(<SlideFadeIn>Test</SlideFadeIn>);
    const el = screen.getByText("Test");
    expect(el).not.toHaveAttribute("role");
  });

  it("calls controls.start('visible') when inView becomes true", async () => {
    mockInView = true;

    await act(async () => {
      render(<SlideFadeIn>Animate Me</SlideFadeIn>);
    });

    expect(startMock).toHaveBeenCalledWith("visible");
  });

  it("does not call controls.start if inView is false", () => {
    mockInView = false;

    render(<SlideFadeIn>Static</SlideFadeIn>);

    expect(startMock).not.toHaveBeenCalled();
  });
});
