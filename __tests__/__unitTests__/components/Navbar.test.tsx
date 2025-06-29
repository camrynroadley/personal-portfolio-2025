/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { Navbar } from "../../../src/components/Navbar";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: (props: any) => <i {...props} />,
}));

describe("Navbar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders the navbar and LinkedIn link", () => {
    render(<Navbar />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("navbar-linkedin")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/camrynroadley/"
    );
  });

  it("toggles GitHub dropdown when clicked", () => {
    render(<Navbar />);
    const button = screen.getByTestId("navbar-github-button");

    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId("navbar-github-dropdown")).toBeInTheDocument();

    act(() => {
      fireEvent.click(button);
    });

    // wait for AnimatePresence to remove it
    return waitFor(() => {
      expect(
        screen.queryByTestId("navbar-github-dropdown")
      ).not.toBeInTheDocument();
    });
  });

  it("closes the dropdown on scroll", async () => {
    render(<Navbar />);
    const button = screen.getByTestId("navbar-github-button");

    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId("navbar-github-dropdown")).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId("navbar-github-dropdown")
      ).not.toBeInTheDocument();
    });
  });

  it("closes the dropdown after timeout", async () => {
    render(<Navbar />);
    const button = screen.getByTestId("navbar-github-button");

    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId("navbar-github-dropdown")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId("navbar-github-dropdown")
      ).not.toBeInTheDocument();
    });
  });

  it("closes the dropdown when clicking outside", async () => {
    render(<Navbar />);
    const button = screen.getByTestId("navbar-github-button");

    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId("navbar-github-dropdown")).toBeInTheDocument();

    act(() => {
      fireEvent.mouseDown(document.body);
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId("navbar-github-dropdown")
      ).not.toBeInTheDocument();
    });
  });

  it("renders both GitHub links when dropdown is open", () => {
    render(<Navbar />);
    const button = screen.getByTestId("navbar-github-button");

    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId("navbar-github-personal")).toHaveAttribute(
      "href",
      "https://github.com/camrynroadley"
    );
    expect(screen.getByTestId("navbar-github-professional")).toHaveAttribute(
      "href",
      "https://github.com/croadley"
    );
  });
});
