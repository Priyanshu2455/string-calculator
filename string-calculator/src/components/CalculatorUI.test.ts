import { add } from "./CalculatorUI";

describe("String Calculator", () => {
  it("returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  it("returns number itself for single number", () => {
    expect(add("1")).toBe(1);
  });

  it("returns sum for two numbers separated by comma", () => {
    expect(add("1,5")).toBe(6);
  });

  it("returns sum for multiple comma-separated numbers", () => {
    expect(add("1,2,3")).toBe(6);
  });

  it("handles new lines between numbers", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  it("supports custom delimiter", () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  it("throws exception for negative numbers", () => {
    expect(() => add("1,-2,-4")).toThrow("negative numbers not allowed -2,-4");
  });
});
