import { render, screen } from "@testing-library/react";
import { Hero } from "../../../../src/sections/hero";

jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    useScroll: () => ({ scrollY: { on: jest.fn() } }),
    useTransform: () => 0,
    useSpring: () => 0,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
  };
});

jest.mock("../../../../src/components/BlurText", () => ({
  BlurText: ({ text }: { text: string }) => <p data-testid="blur-text">{text}</p>,
}));

jest.mock("../../../../src/components/Tag", () => ({
  Tag: ({ text }: { text: string }) => <span data-testid={`tag-${text.toLowerCase()}`}>{text}</span>,
}));

jest.mock("../../../../src/components/SlideFadeIn", () => ({
  SlideFadeIn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="slide-fade">{children}</div>
  ),
}));

describe("Hero", () => {
  it("renders the hero container", () => {
    render(<Hero />);
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });

  it("renders the hero text container", () => {
    render(<Hero />);
    expect(screen.getByTestId("hero-text-container")).toBeInTheDocument();
  });

  it("renders the BlurText with correct content", () => {
    render(<Hero />);
    expect(screen.getByTestId("blur-text")).toHaveTextContent(
      "Full-stack developer focused on user experiences and the teams that build them."
    );
  });

  it("renders all animated tags", () => {
    render(<Hero />);
    const tagTexts = ["blending", "technical", "skills", "with", "leadership"];
    tagTexts.forEach((text) => {
      expect(screen.getByTestId(`tag-${text}`)).toBeInTheDocument();
    });
  });

  it("renders the subtext content", () => {
    render(<Hero />);
    expect(screen.getByTestId("hero-subtext")).toHaveTextContent(
      "Building commerce and checkout user experiences at TELUS."
    );
  });
});
