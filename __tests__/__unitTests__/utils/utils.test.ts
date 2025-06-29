import { cn } from "../../../src/utils/utils";

describe("cn", () => {
  it("returns a single class correctly", () => {
    expect(cn("text-lg")).toBe("text-lg");
  });

  it("merges multiple classes", () => {
    expect(cn("text-lg", "font-bold")).toBe("text-lg font-bold");
  });

  it("deduplicates conflicting Tailwind classes using twMerge", () => {
    expect(cn("text-sm", "text-lg")).toBe("text-lg"); // text-lg overrides
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("handles conditional classNames using clsx logic", () => {
    expect(cn("text-lg", false && "hidden", null, undefined)).toBe("text-lg");
  });

  it("returns an empty string if no classes are provided", () => {
    expect(cn()).toBe("");
  });

  it("handles objects (clsx feature)", () => {
    expect(cn({ "text-lg": true, "hidden": false })).toBe("text-lg");
  });
});
