import { parseQueryString } from "../parseQueryString";

describe("parseQueryString", () => {
  it("should return empty object for empty string", () => {
    const result = parseQueryString("");
    expect(result).toEqual({});
  });

  it("should return expected result for a single key-value pair", () => {
    const result = parseQueryString("?key=value");
    expect(result).toEqual({ key: "value" });
  });

  it("should return expected result for multiple key-value pairs", () => {
    const result = parseQueryString("?key1=value1&key2=value2&key3=value3");
    expect(result).toEqual({
      key1: "value1",
      key2: "value2",
      key3: "value3",
    });
  });

  it("should handle special characters in values", () => {
    const result = parseQueryString("?key=value%20with%20spaces");
    expect(result).toEqual({ key: "value with spaces" });
  });
});
