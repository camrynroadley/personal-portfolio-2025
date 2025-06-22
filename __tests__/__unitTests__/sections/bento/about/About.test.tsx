import { render, screen } from "@testing-library/react";
import { About } from "../../../../../src/sections/bento/about";

describe("About", () => {
  beforeEach(() => {
    render(<About />);
  });

  it("renders the About container", () => {
    expect(screen.getByTestId("about")).toBeInTheDocument();
  });

  it("renders the Location section with heading and content", () => {
    const locationSection = screen.getByTestId("about-location");
    expect(locationSection).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /location/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Vancouver, BC")).toBeInTheDocument();
  });

  it("renders the Socials section with headings and links", () => {
    const socialsSection = screen.getByTestId("about-socials");
    expect(socialsSection).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /socials/i })
    ).toBeInTheDocument();

    const linkedin = screen.getByRole("link", { name: /linkedin/i });
    const personalGitHub = screen.getByRole("link", {
      name: /personal github profile/i,
    });
    const professionalGitHub = screen.getByRole("link", {
      name: /professional github profile/i,
    });

    expect(linkedin).toHaveAttribute(
      "href",
      expect.stringContaining("linkedin")
    );
    expect(personalGitHub).toHaveAttribute(
      "href",
      expect.stringContaining("camrynroadley")
    );
    expect(professionalGitHub).toHaveAttribute(
      "href",
      expect.stringContaining("croadley")
    );

    expect(screen.getByText("Personal")).toBeInTheDocument();
    expect(screen.getByText("Professional")).toBeInTheDocument();
  });

  it("renders the Skills section with heading and list items", () => {
    const skillsSection = screen.getByTestId("about-skills");
    expect(skillsSection).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /what i do/i })
    ).toBeInTheDocument();

    const skills = [
      "Web Design",
      "Web Development",
      "Product Management",
      "Technical Program Management",
    ];
    skills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });
});
