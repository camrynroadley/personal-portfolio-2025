import { getRoles } from "../../../src/delegates/getRoles";
import { supabase } from "../../../src/supabase/client";
import type { Role } from "../../../src/types/app";

jest.mock("../../../src/supabase/client", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe("getRoles", () => {
  const mockSelect = jest.fn();
  const mockFrom = supabase.from as jest.Mock;

  const mockRoles: Role[] = [
    {
      id: 1,
      title: "Engineer",
      company: "ExampleCorp",
      timeframe: "2022–2024",
      description: "Build things",
      responsibilities: [],
      isCurrentRole: true,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockFrom.mockReturnValue({ select: mockSelect });
  });

  it("returns role data when Supabase responds successfully", async () => {
    mockSelect.mockResolvedValue({ data: mockRoles, error: null });

    const result = await getRoles();

    expect(mockFrom).toHaveBeenCalledWith("roles");
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(result).toEqual(mockRoles);
  });

  it("logs an error and returns undefined when Supabase returns an error", async () => {
    const error = new Error("Supabase error");
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    mockSelect.mockResolvedValue({ data: null, error });

    const result = await getRoles();

    expect(consoleSpy).toHaveBeenCalledWith("Error fetching projects:", error);
    expect(result).toBeNull();

    consoleSpy.mockRestore();
  });
});
