// Mock the dynamic import of the supabase client
jest.mock("../../../src/supabase/client", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
    })),
  },
}));

const mockFrom = jest.fn();
const mockSelect = jest.fn();

beforeEach(() => {
  jest.resetModules();

  // Reassign mocked implementations for chaining
  const mockedSupabase = {
    from: mockFrom,
  };

  mockFrom.mockReturnValue({
    select: mockSelect,
  });

  jest.doMock("../../../src/supabase/client", () => ({
    supabase: mockedSupabase,
  }));
});

describe("getProjects", () => {
  it("returns data when supabase returns data", async () => {
    const mockData = [{ id: 1, name: "Project A" }];
    mockSelect.mockResolvedValue({ data: mockData, error: null });

    const { getProjects } = await import("../../../src/delegates/getProjects");
    const result = await getProjects();

    expect(mockFrom).toHaveBeenCalledWith("projects");
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(result).toEqual(mockData);
  });

  it("returns an empty array and logs error if there is an error", async () => {
    const mockError = new Error("Supabase error");
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    mockSelect.mockResolvedValue({ data: null, error: mockError });

    const { getProjects } = await import("../../../src/delegates/getProjects");
    const result = await getProjects();

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
    expect(result).toEqual([]);

    consoleErrorSpy.mockRestore();
  });
});
