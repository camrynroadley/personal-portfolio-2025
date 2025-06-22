import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Navbar } from "../../../src/components/Navbar";

// Needed to mock FontAwesome (so it doesn't break tests)
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: (props: any) => <i {...props} />,
}));

describe("Navbar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders the navbar and LinkedIn link", () => {
    render(<Navbar />);

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();

    const linkedInLink = screen.getByTestId("navbar-linkedin");
    expect(linkedInLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/camrynroadley/"
    );
  });

  it("toggles GitHub dropdown when the button is clicked", () => {
    render(<Navbar />);

    const githubButton = screen.getByTestId("navbar-github-button");

    fireEvent.click(githubButton);
    expect(screen.getByTestId("navbar-github-dropdown")).toBeInTheDocument();

    fireEvent.click(githubButton);
    expect(
      screen.queryByTestId("navbar-github-dropdown")
    ).not.toBeInTheDocument();
  });

  it("closes the dropdown on scroll", () => {
    render(<Navbar />);
    const githubButton = screen.getByTestId("navbar-github-button");

    fireEvent.click(githubButton);
    expect(screen.getByTestId("navbar-github-dropdown")).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(
      screen.queryByTestId("navbar-github-dropdown")
    ).not.toBeInTheDocument();
  });

  it("closes the dropdown after timeout", () => {
    render(<Navbar />);
    const githubButton = screen.getByTestId("navbar-github-button");

    fireEvent.click(githubButton);
    expect(screen.getByTestId("navbar-github-dropdown")).toBeInTheDocument();

    it("closes the dropdown after timeout", () => {
      render(<Navbar />);
      const githubButton = screen.getByTestId("navbar-github-button");

      fireEvent.click(githubButton);
      expect(screen.getByTestId("navbar-github-dropdown")).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(
        screen.queryByTestId("navbar-github-dropdown")
      ).not.toBeInTheDocument();
    });

    expect(
      screen.queryByTestId("navbar-github-dropdown")
    ).not.toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", () => {
    render(<Navbar />);
    const githubButton = screen.getByTestId("navbar-github-button");

    fireEvent.click(githubButton);
    expect(screen.getByTestId("navbar-github-dropdown")).toBeInTheDocument();

    // Simulate outside click
    fireEvent.mouseDown(document);
    expect(
      screen.queryByTestId("navbar-github-dropdown")
    ).not.toBeInTheDocument();
  });

  it("renders both GitHub links when dropdown is open", () => {
    render(<Navbar />);
    const githubButton = screen.getByTestId("navbar-github-button");

    fireEvent.click(githubButton);

    const personalLink = screen.getByTestId("navbar-github-personal");
    const professionalLink = screen.getByTestId("navbar-github-professional");

    expect(personalLink).toHaveAttribute(
      "href",
      "https://github.com/camrynroadley"
    );
    expect(professionalLink).toHaveAttribute(
      "href",
      "https://github.com/croadley"
    );
  });
});
