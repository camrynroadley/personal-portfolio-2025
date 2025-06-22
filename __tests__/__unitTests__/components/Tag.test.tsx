import { render, screen, act } from "@testing-library/react";
import { Tag } from "../../../src/components/Tag";
import userEvent from "@testing-library/user-event";

// Helper to flush motion animations and effects
jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    ...jest.requireActual("framer-motion"),
    motion: {
      div: React.forwardRef((props: any, ref) => <div ref={ref} {...props} />),
      span: React.forwardRef((props: any, ref) => <span ref={ref} {...props} />),
    },
  };
});

describe("Tag", () => {
  it("renders the tag with default props", () => {
    render(<Tag text="Test Tag" />);

    const tag = screen.getByTestId("animated-tag-test-tag");
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveAttribute("aria-label", "Floating tag: Test Tag");
    expect(tag).toHaveClass("inline-flex", "items-center", "justify-center");
    expect(tag.textContent).toBe("Test Tag");
  });

  it("respects custom classNames and styles", () => {
    render(
      <Tag
        text="Styled"
        outerDivClassName="custom-outer"
        innerDivClassName="custom-inner"
        style={{ top: "50px", left: "100px" }}
        backgroundColor="pink"
      />
    );

    const tag = screen.getByTestId("animated-tag-styled");
    expect(tag).toHaveStyle({ top: "50px", left: "100px" });
    const inner = tag.querySelector("div");
    expect(inner).toHaveClass("custom-inner");
  });

  it("does not apply floating transform when isFloating is false", () => {
    render(<Tag text="Static Tag" isFloating={false} />);
    const tag = screen.getByTestId("animated-tag-static-tag");
    expect(tag.style.transform).toBe("");
  });

  it("reacts to mouse movement when isFloating is true", () => {
    render(<Tag text="Floaty" isFloating strength={100} />);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    act(() => {
      window.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX: centerX + 50,
          clientY: centerY - 25,
        })
      );
    });

    const tag = screen.getByTestId("animated-tag-floaty");
    // We can't test exact transform value, but can check presence
    expect(tag.style.transform).toMatch(/translate3d/);
  });

  it("does not animate if isAnimated is false", () => {
    render(<Tag text="NoAnim" isAnimated={false} />);
    const tag = screen.getByTestId("animated-tag-noanim");
    const inner = tag.querySelector("div");
    expect(inner?.getAttribute("animate")).toBe(null);
  });
});
