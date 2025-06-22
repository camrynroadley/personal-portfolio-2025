import { render, screen } from "@testing-library/react";
import { Projects } from "../../../../../src/sections/bento/projects";

jest.mock("../../../../../src/components/SlideFadeIn", () => ({
  SlideFadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock("../../../../../src/components/Card", () => ({
  Card: ({ title }: { title: string }) => (
    <div data-testid={`mock-card-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      Mock Card: {title}
    </div>
  ),
}));

jest.mock("../../../../../src/context/ProjectsContext", () => ({
  useProjects: jest.fn(),
}));

import { useProjects } from "../../../../../src/context/ProjectsContext";

describe("Projects", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays a loading message when loading is true", () => {
    (useProjects as jest.Mock).mockReturnValue({
      loading: true,
      projects: [],
    });

    render(<Projects />);

    expect(screen.getByTestId("projects-loading")).toBeInTheDocument();
    expect(screen.getByText(/loading projects/i)).toBeInTheDocument();
  });

  it("renders project intro and cards when loading is false", () => {
    (useProjects as jest.Mock).mockReturnValue({
      loading: false,
      projects: [
        {
          id: "1",
          title: "Test Project",
          short_description: "Short description",
          website_link: "https://example.com",
          github_link: "https://github.com/example",
          tags: ["React", "TypeScript"],
        },
      ],
    });

    render(<Projects />);

    expect(screen.getByTestId("projects")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /projects section/i })).toBeInTheDocument();

    expect(screen.getByTestId("projects-intro")).toHaveTextContent(/maintain my technical skills/i);

    expect(screen.getByTestId("projects-grid-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("projects-grid")).toBeInTheDocument();

    expect(screen.getByTestId("mock-card-test-project")).toBeInTheDocument();
  });
});
