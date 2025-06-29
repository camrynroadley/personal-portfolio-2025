import { render, screen, waitFor } from "@testing-library/react";
import {
  ProjectsProvider,
  useProjects,
} from "../../../src/context/ProjectsContext";
import { getProjects } from "../../../src/delegates/getProjects";

jest.mock("../../../src/delegates/getProjects", () => ({
  getProjects: jest.fn().mockResolvedValue([]),
}));

const mockGetProjects = getProjects as jest.MockedFunction<typeof getProjects>;

const Consumer = () => {
  const { projects, loading, refreshProjects } = useProjects();

  return (
    <div>
      <div data-testid="loading">{loading ? "true" : "false"}</div>
      <div data-testid="projects-count">{projects.length}</div>
      <button onClick={refreshProjects} data-testid="refresh-button">
        Refresh
      </button>
    </div>
  );
};

describe("ProjectsContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children and provides context with loading state", async () => {
    mockGetProjects.mockResolvedValueOnce([
      { id: "1", title: "Test Project", short_description: "Desc", tags: [] },
    ]);

    render(
      <ProjectsProvider>
        <Consumer />
      </ProjectsProvider>
    );

    expect(screen.getByTestId("loading")).toHaveTextContent("true");

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
      expect(screen.getByTestId("projects-count")).toHaveTextContent("1");
    });
  });

  it("refreshProjects updates the context with new projects", async () => {
    mockGetProjects
      .mockResolvedValueOnce([
        { id: "1", title: "Project A", short_description: "", tags: [] },
      ])
      .mockResolvedValueOnce([
        { id: "2", title: "Project B", short_description: "", tags: [] },
      ]);

    render(
      <ProjectsProvider>
        <Consumer />
      </ProjectsProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("projects-count")).toHaveTextContent("1");
    });

    screen.getByTestId("refresh-button").click();

    await waitFor(() => {
      expect(screen.getByTestId("projects-count")).toHaveTextContent("1");
    });
  });

  it("throws an error if useProjects is used outside of the provider", () => {
    const BrokenConsumer = () => {
      useProjects();
      return null;
    };

    try {
      render(<BrokenConsumer />);
    } catch (e) {
      expect((e as Error).message).toBe(
        "useProjects must be used within a ProjectsProvider"
      );
    }
  });
});
