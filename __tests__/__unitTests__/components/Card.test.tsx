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
  it("renders the card title", () => {
    render(<Card {...mockProps} />);
    const titleEl = screen.getByTestId("card-title");
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveTextContent("Test Project");
  });

  it("renders markdown content", () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText("Bold text")).toBeInTheDocument();
    const bold = screen.getByText("Bold text");
    expect(bold.tagName.toLowerCase()).toBe("strong");
  });

  it("renders all provided tags", () => {
    render(<Card {...mockProps} />);
    const tagContainer = screen.getByTestId("card-tags");
    mockProps.tags.forEach((tag) => {
      expect(tagContainer).toHaveTextContent(tag);
    });
  });

  it("renders website link with correct href", () => {
    render(<Card {...mockProps} />);
    const websiteLink = screen.getByTestId(
      "card-link-website"
    ) as HTMLAnchorElement;
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink.href).toBe(mockProps.websiteLink + "/");
  });

  it("renders GitHub link with correct href", () => {
    render(<Card {...mockProps} />);
    const githubLink = screen.getByTestId(
      "card-link-github"
    ) as HTMLAnchorElement;
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.href).toBe(mockProps.githubLink);
  });

  it("has the correct data-testid on the root element", () => {
    render(<Card {...mockProps} />);
    const id = `project-card-card-title-test-project`;
    const root = screen.getByTestId(id);
    expect(root).toBeInTheDocument();
  });

  it("renders without website link", () => {
    render(<Card {...mockProps} websiteLink={""} />);
    expect(screen.queryByTestId("card-link-website")).not.toBeInTheDocument();
  });

  it("renders without GitHub link", () => {
    render(<Card {...mockProps} githubLink={""} />);
    expect(screen.getByTestId("card-link-website")).toBeInTheDocument();
    expect(screen.queryByTestId("card-link-github")).not.toBeInTheDocument();
  });

  it("renders correctly with no tags", () => {
    render(<Card {...mockProps} tags={[]} />);
    expect(screen.getByTestId("card-tags")).toBeEmptyDOMElement();
  });

  it("renders plain text in description", () => {
    render(
      <Card {...mockProps} shortDescription={"This is plain text only."} />
    );

    expect(screen.getByText("This is plain text only.")).toBeInTheDocument();
  });
});
