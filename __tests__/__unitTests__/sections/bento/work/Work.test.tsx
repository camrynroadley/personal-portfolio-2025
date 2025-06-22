import { render, screen, fireEvent } from "@testing-library/react";
import { Work } from "../../../../../src/sections/bento/work";

jest.mock("../../../../../src/components/RolesCarousel", () => ({
  RolesCarousel: ({ role }: { role: any }) => (
    <div data-testid="mock-carousel">{role.title}</div>
  ),
}));

jest.mock("../../../../../src/context/RolesContext", () => ({
  useRoles: jest.fn(),
}));

import { useRoles } from "../../../../../src/context/RolesContext";

describe("Work", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows a loading message when roles are loading", () => {
    (useRoles as jest.Mock).mockReturnValue({
      loading: true,
      roles: [],
    });

    render(<Work />);
    expect(screen.getByTestId("work-loading")).toBeInTheDocument();
    expect(screen.getByText(/loading roles/i)).toBeInTheDocument();
  });

  it("renders intro, navigation, and carousel when roles are loaded", () => {
    (useRoles as jest.Mock).mockReturnValue({
      loading: false,
      roles: [
        { title: "Role A" },
        { title: "Role B" },
      ],
    });

    render(<Work />);
    expect(screen.getByTestId("work")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /work experience section/i })).toBeInTheDocument();
    expect(screen.getByTestId("work-intro")).toBeInTheDocument();
    expect(screen.getByTestId("prev-role-button")).toBeInTheDocument();
    expect(screen.getByTestId("next-role-button")).toBeInTheDocument();
    expect(screen.getByTestId("mock-carousel")).toHaveTextContent("Role A");
  });

  it("navigates roles forward and backward correctly", () => {
    (useRoles as jest.Mock).mockReturnValue({
      loading: false,
      roles: [
        { title: "Role A" },
        { title: "Role B" },
        { title: "Role C" },
      ],
    });

    render(<Work />);

    const next = screen.getByTestId("next-role-button");
    const prev = screen.getByTestId("prev-role-button");

    expect(screen.getByTestId("mock-carousel")).toHaveTextContent("Role A");
    fireEvent.click(next);
    expect(screen.getByTestId("mock-carousel")).toHaveTextContent("Role B");
    fireEvent.click(next);
    expect(screen.getByTestId("mock-carousel")).toHaveTextContent("Role C");
    fireEvent.click(next);
    expect(screen.getByTestId("mock-carousel")).toHaveTextContent("Role A");
    fireEvent.click(prev);
    expect(screen.getByTestId("mock-carousel")).toHaveTextContent("Role C");
  });
});
