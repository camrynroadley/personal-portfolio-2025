/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, act } from "@testing-library/react";
import App from "../../src/App";

// Mock dependencies
jest.mock("../../src/sections/hero", () => ({
  Hero: () => <div data-testid="mock-hero">Hero</div>,
}));

jest.mock("../../src/sections/bento", () => ({
  Bento: () => <div data-testid="mock-bento">Bento</div>,
}));

jest.mock("../../src/components/Navbar", () => ({
  Navbar: () => <nav data-testid="mock-navbar">Navbar</nav>,
}));

jest.mock("../../src/components/Spinner", () => ({
  Spinner: (props: any) => <div {...props}>Loading...</div>,
}));

// Mock scrollY from framer-motion
const onMock = jest.fn();
jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    useScroll: () => ({
      scrollY: {
        on: onMock,
      },
    }),
    motion: {
      div: (props: any) => <div {...props} />,
    },
  };
});

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe("App", () => {
  beforeEach(() => {
    onMock.mockImplementation(() => () => {}); // mock scrollY.on unsubscribe
    jest.useFakeTimers();

    // Mock font loading
    (document as any).fonts = {
      load: jest.fn(() => Promise.resolve()),
    };

    // Mock window load event
    Object.defineProperty(document, "readyState", {
      value: "loading",
      configurable: true,
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("renders spinner while fonts and window are not ready", () => {
    render(<App />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders content after fonts and window load", async () => {
    render(<App />);

    // Simulate fonts + window load
    await act(async () => {
      // Fire load event manually
      const loadEvent = new Event("load");
      window.dispatchEvent(loadEvent);
      jest.runAllTimers();
    });

    // Wait for DOM updates
    expect(await screen.findByTestId("main")).toBeInTheDocument();
    expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
    expect(screen.getByTestId("mock-bento")).toBeInTheDocument();
    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
  });

  it("displays and hides navbar based on scroll position", async () => {
    const listeners: Record<string, (val: number) => void> = {};
    onMock.mockImplementation((event, callback) => {
      listeners[event] = callback;
      return () => delete listeners[event];
    });

    render(<App />);

    await act(async () => {
      const loadEvent = new Event("load");
      window.dispatchEvent(loadEvent);
      jest.runAllTimers();
    });

    // Initial: navbar should be visible
    expect(screen.queryByTestId("navbar-wrapper")).toBeInTheDocument();

    // Scroll past 30px
    act(() => {
      listeners.change(100);
    });

    expect(screen.queryByTestId("navbar-wrapper")).not.toBeInTheDocument();

    // Scroll back up
    act(() => {
      listeners.change(0);
    });

    expect(screen.queryByTestId("navbar-wrapper")).toBeInTheDocument();
  });
});
