import { render, screen } from "@testing-library/react";
import { RolesCarousel } from "../../../src/components/RolesCarousel";
import { Role } from "../../../src/types/app";

jest.mock("../../../src/components/PieChart", () => ({
  PieAnimation: () => <div data-testid="pie-animation" />,
  CustomLegend: () => <div data-testid="custom-legend" />,
}));

jest.mock("../../../src/components/StaticTag", () => ({
  StaticTag: ({ text }: { text: string }) => (
    <div data-testid="static-tag">{text}</div>
  ),
}));

const mockRole: Role = {
  id: 1,
  title: "Senior Developer",
  company: "ExampleCorp",
  timeframe: "Jan 2021 - Present",
  description: "Worked on modernizing the front-end stack.",
  responsibilities: [
    { label: "Frontend", value: 50 },
    { label: "Backend", value: 50 },
  ],
  isCurrentRole: true,
};

describe("RolesCarousel", () => {
  it("renders the role section with correct test ID", () => {
    render(<RolesCarousel role={mockRole} />);
    expect(screen.getByTestId("role-carousel")).toBeInTheDocument();
  });

  it("renders the title, company, timeframe, and description", () => {
    render(<RolesCarousel role={mockRole} />);
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    expect(screen.getByText("ExampleCorp")).toBeInTheDocument();
    expect(screen.getByText("Jan 2021 - Present")).toBeInTheDocument();
    expect(
      screen.getByText("Worked on modernizing the front-end stack.")
    ).toBeInTheDocument();
  });

  it("renders PieAnimation and CustomLegend if responsibilities exist", () => {
    render(<RolesCarousel role={mockRole} />);
    expect(screen.getByTestId("pie-animation")).toBeInTheDocument();
    expect(screen.getByTestId("custom-legend")).toBeInTheDocument();
  });

  it("renders StaticTag if isCurrentRole is true", () => {
    render(<RolesCarousel role={mockRole} />);
    expect(screen.getByTestId("static-tag")).toHaveTextContent("Current Role");
  });

  it("does not render StaticTag if isCurrentRole is false", () => {
    const role = { ...mockRole, isCurrentRole: false };
    render(<RolesCarousel role={role} />);
    expect(screen.queryByTestId("static-tag")).not.toBeInTheDocument();
  });

  it("does not render PieAnimation or CustomLegend if responsibilities are undefined", () => {
    const role = { ...mockRole, responsibilities: undefined };
    render(<RolesCarousel role={role} />);
    expect(screen.queryByTestId("pie-animation")).not.toBeInTheDocument();
    expect(screen.queryByTestId("custom-legend")).not.toBeInTheDocument();
  });

  it("has correct aria attributes", () => {
    render(<RolesCarousel role={mockRole} />);
    const section = screen.getByTestId("role-carousel");
    expect(section).toHaveAttribute("aria-labelledby", "role-title-ExampleCorp");

    const header = screen.getByLabelText("Company and timeframe");
    expect(header).toBeInTheDocument();

    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveAttribute("id", "role-title-ExampleCorp");
  });
});
