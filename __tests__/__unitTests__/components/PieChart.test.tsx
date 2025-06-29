/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { PieAnimation, CustomLegend } from "../../../src/components/PieChart";
import { Responsibility } from "../../../src/types/app";

// Mock the MUI PieChart since we’re not testing the implementation
jest.mock("@mui/x-charts/PieChart", () => ({
  PieChart: ({ series }: any) => (
    <div data-testid="mock-pie-chart">
      {series[0]?.data?.map((d: any) => (
        <div key={d.label}>{d.label}</div>
      ))}
    </div>
  ),
}));

describe("PieAnimation", () => {
  const responsibilities: Responsibility[] = [
    { label: "Frontend", value: 40 },
    { label: "Backend", value: 30 },
    { label: "DevOps", value: 20 },
    { label: "Testing", value: 5 },
    { label: "Docs", value: 5 },
    { label: "Support", value: 10 }, // Should be sliced off
  ];

  it("renders a PieChart inside a Box with correct ARIA attributes", () => {
    render(<PieAnimation responsibilities={responsibilities} />);
    const pie = screen.getByTestId("pie-chart");
    expect(pie).toBeInTheDocument();
    expect(pie).toHaveAttribute("role", "img");
    expect(pie).toHaveAttribute(
      "aria-label",
      "Pie chart visualizing key responsibilities"
    );
  });

  it("passes sliced responsibilities (max 5) to PieChart", () => {
    render(<PieAnimation responsibilities={responsibilities} />);
    expect(screen.getByTestId("mock-pie-chart")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.queryByText("Support")).not.toBeInTheDocument(); // sliced off
  });
});

describe("CustomLegend", () => {
  const responsibilities: Responsibility[] = [
    { label: "Frontend", value: 40 },
    { label: "Backend", value: 30 },
    { label: "DevOps", value: 20 },
    { label: "Testing", value: 5 },
    { label: "Docs", value: 5 },
    { label: "Support", value: 10 },
  ];

  it("renders a flex container with role list and correct ARIA label", () => {
    render(<CustomLegend responsibilities={responsibilities} />);
    const legend = screen.getByTestId("pie-legend");
    expect(legend).toBeInTheDocument();
    expect(legend).toHaveAttribute("role", "list");
    expect(legend).toHaveAttribute("aria-label", "Responsibility legend");
  });

  it("splits responsibilities into columns with max 3 rows each", () => {
    render(<CustomLegend responsibilities={responsibilities} />);
    const columns = screen.getAllByRole("list");
    expect(columns).toHaveLength(3); // 6 items split into 3-per column = 2 columns + parent

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(6);

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });
});
