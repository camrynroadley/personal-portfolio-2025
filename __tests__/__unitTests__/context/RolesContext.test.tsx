import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
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
    timeframe: "2021–2023",
    description: "Building systems",
    responsibilities: [],
    isCurrentRole: true,
  },
];

const Consumer = () => {
  const { roles, loading, refreshRoles } = useRoles();

  return (
    <div>
      <div data-testid="loading">{loading ? "true" : "false"}</div>
      <div data-testid="roles">{roles.map((r) => r.title).join(", ")}</div>
      <button data-testid="refresh" onClick={refreshRoles}>
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

    render(
      <RolesProvider>
        <Consumer />
      </RolesProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("roles")).toHaveTextContent("Engineer");
    });

    expect(getRoles).toHaveBeenCalledTimes(1);
  });

  it("refreshRoles updates the context", async () => {
    (getRoles as jest.Mock)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(mockRoles);

    await act(async () => {
      render(
        <RolesProvider>
          <Consumer />
        </RolesProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    expect(screen.getByTestId("roles")).toHaveTextContent("");

    await act(async () => {
      fireEvent.click(screen.getByTestId("refresh"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("roles")).toHaveTextContent("Engineer");
    });
  });

  it("throws if useRoles is used outside provider", () => {
    const Broken = () => {
      useRoles();
      return <div />;
    };

    expect(() => render(<Broken />)).toThrow(
      "useRoles must be used within a RolesProvider"
    );
  });
});
