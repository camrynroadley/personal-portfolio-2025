import { render, screen, waitFor, act } from "@testing-library/react";
import { RolesProvider, useRoles } from "../../../src/context/RolesContext";
import { getRoles } from "../../../src/delegates/getRoles";
import type { Role } from "../../../src/types/app";

jest.mock("../../../src/delegates/getRoles", () => ({
  getRoles: jest.fn(),
}));

const mockRoles: Role[] = [
  {
    id: 1,
    title: "Engineer",
    company: "TestCorp",
    timeframe: "2020-2022",
    description: "Built stuff",
    responsibilities: [],
    isCurrentRole: false,
  },
  {
    id: 2,
    title: "Lead",
    company: "NextGen",
    timeframe: "2022-present",
    description: "Led stuff",
    responsibilities: [],
    isCurrentRole: true,
  },
];

const ConsumerComponent = () => {
  const { roles, loading, refreshRoles } = useRoles();
  return (
    <div>
      <div data-testid="loading">{loading ? "true" : "false"}</div>
      <div data-testid="roles">{roles.map((r) => r.title).join(", ")}</div>
      <button onClick={refreshRoles} data-testid="refresh-button">
        Refresh
      </button>
    </div>
  );
};

describe("RolesContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loads roles on mount and updates context", async () => {
    (getRoles as jest.Mock).mockResolvedValueOnce(mockRoles);

    await act(async () => {
      render(
        <RolesProvider>
          <ConsumerComponent />
        </RolesProvider>
      );
    });

    expect(screen.getByTestId("loading")).toHaveTextContent("true");

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    expect(screen.getByTestId("roles")).toHaveTextContent("Engineer, Lead");
  });

  it("refreshRoles manually updates roles", async () => {
    (getRoles as jest.Mock)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(mockRoles);

    render(
      <RolesProvider>
        <ConsumerComponent />
      </RolesProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });
    expect(screen.getByTestId("roles")).toHaveTextContent("");

    // Refresh roles
    screen.getByTestId("refresh-button").click();

    await waitFor(() => {
      expect(screen.getByTestId("roles")).toHaveTextContent("Engineer, Lead");
    });

    expect(getRoles).toHaveBeenCalledTimes(2);
  });

  it("throws an error if useRoles is used outside of provider", () => {
    const TestComponent = () => {
      useRoles();
      return <div />;
    };

    expect(() => render(<TestComponent />)).toThrow(
      "useRoles must be used within a RolesProvider"
    );
  });
});
