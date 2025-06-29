import { render, screen } from "@testing-library/react";
import { Bento } from "../../../../src/sections/bento/";

// Mock the child components
jest.mock("../../../../src/sections/bento/about", () => ({
  About: () => <div data-testid="mock-about">Mock About</div>,
}));

jest.mock("../../../../src/sections/bento/work", () => ({
  Work: () => <div data-testid="mock-work">Mock Work</div>,
}));

jest.mock("../../../../src/sections/bento/projects", () => ({
  Projects: () => <div data-testid="mock-project">Mock Project</div>,
}));

jest.mock("../../../../src/components/SlideFadeIn", () => ({
  SlideFadeIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Bento", () => {
  it("renders the Bento layout with About, Work, and Projects sections", () => {
    render(<Bento />);

    expect(screen.getByTestId("bento")).toBeInTheDocument();
    expect(screen.getByTestId("about-section")).toBeInTheDocument();
    expect(screen.getByTestId("work-section")).toBeInTheDocument();
    expect(screen.getByTestId("projects-section")).toBeInTheDocument();

    expect(screen.getByTestId("mock-about")).toBeInTheDocument();
    expect(screen.getByTestId("mock-work")).toBeInTheDocument();
    expect(screen.getByTestId("mock-project")).toBeInTheDocument();

    expect(screen.getByRole("region", { name: /bento content sections/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /about section/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /work experience section/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /projects section/i })).toBeInTheDocument();
  });
});
