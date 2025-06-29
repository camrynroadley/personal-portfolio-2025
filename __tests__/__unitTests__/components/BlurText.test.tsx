/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { BlurText } from "../../../src/components/BlurText";

// IntersectionObserver mock
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(callback: any) {
      this.callback = callback;
    }
    callback: any;
    observe = jest.fn(() => {
      this.callback([{ isIntersecting: true }]);
    });
    unobserve = jest.fn();
    disconnect = jest.fn();
  } as any;
});

afterAll(() => {
  delete (global as any).IntersectionObserver;
});

describe("BlurText", () => {
  it("renders the full text content", () => {
    render(<BlurText text="Hello World" />);
    expect(screen.getByTestId("blur-text")).toHaveTextContent("Hello World");
  });

  it("splits text by words when animateBy is 'words'", () => {
    render(<BlurText text="Hello Blur World" animateBy="words" />);
    const spans = screen.getByTestId("blur-text").querySelectorAll("span");
    expect(spans.length).toBe(3);
    expect(spans[0]).toHaveTextContent("Hello");
    expect(spans[1]).toHaveTextContent("Blur");
    expect(spans[2]).toHaveTextContent("World");
  });

  it("splits text by letters when animateBy is 'letters'", () => {
    render(<BlurText text="ABC" animateBy="letters" />);
    const spans = screen.getByTestId("blur-text").querySelectorAll("span");
    expect(spans.length).toBe(3);
    expect(spans[0]).toHaveTextContent("A");
    expect(spans[1]).toHaveTextContent("B");
    expect(spans[2]).toHaveTextContent("C");
  });

  it("renders with default tag (h1) and role heading", () => {
    render(<BlurText text="Title" />);
    const el = screen.getByRole("heading");
    expect(el.tagName.toLowerCase()).toBe("h1");
  });

  it("renders with custom element when 'as' is provided", () => {
    render(<BlurText text="Paragraph" as="p" />);
    const el = screen.getByTestId("blur-text");
    expect(el.tagName.toLowerCase()).toBe("p");
  });

  it("applies custom testId and aria-label", () => {
    render(
      <BlurText
        text="Test Label"
        testId="custom-id"
        ariaLabel="Animated Text"
      />
    );
    const el = screen.getByTestId("custom-id");
    expect(el).toHaveAttribute("aria-label", "Animated Text");
  });

  it("applies default aria-label if none is provided", () => {
    render(<BlurText text="Accessible" />);
    const el = screen.getByTestId("blur-text");
    expect(el).toHaveAttribute("aria-label", "Accessible");
  });
});
