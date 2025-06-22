import { render, screen } from "@testing-library/react";
import { Card } from "../../../src/components/Card";

const mockProps = {
  title: "Test Project",
  shortDescription: "**Bold text** and regular text.",
  websiteLink: "https://example.com",
  githubLink: "https://github.com/example",
  tags: ["React", "TypeScript"],
};

jest.mock("react-markdown", () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => {
    const boldParsed =
      typeof children === "string"
        ? children
            .split(/\*\*(.*?)\*\*/g)
            .map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )
        : children;

    return <div data-testid="mock-markdown">{boldParsed}</div>;
  },
}));

describe("Card", () => {
  beforeEach(() => {
    render(<Card {...mockProps} />);
  });

  it("renders the card title", () => {
    const titleEl = screen.getByTestId("card-title");
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveTextContent("Test Project");
  });

  it("renders markdown content", () => {
    expect(screen.getByText("Bold text")).toBeInTheDocument();
    const bold = screen.getByText("Bold text");
    expect(bold.tagName.toLowerCase()).toBe("strong");
  });

  it("renders all provided tags", () => {
    const tagContainer = screen.getByTestId("card-tags");
    mockProps.tags.forEach((tag) => {
      expect(tagContainer).toHaveTextContent(tag);
    });
  });

  it("renders website link with correct href", () => {
    const websiteLink = screen.getByTestId(
      "card-link-website"
    ) as HTMLAnchorElement;
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink.href).toBe(mockProps.websiteLink + "/");
  });

  it("renders GitHub link with correct href", () => {
    const githubLink = screen.getByTestId(
      "card-link-github"
    ) as HTMLAnchorElement;
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.href).toBe(mockProps.githubLink);
  });

  it("has the correct data-testid on the root element", () => {
    const id = `project-card-card-title-test-project`;
    const root = screen.getByTestId(id);
    expect(root).toBeInTheDocument();
  });
});
