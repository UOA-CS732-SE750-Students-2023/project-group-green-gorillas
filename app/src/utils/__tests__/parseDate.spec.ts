import { parseDate } from "../parseDate";

describe("parseDate", () => {
  it("should format date string correctly", () => {
    const date = "2023-05-10T12:34:56.789Z";
    const expected = "10/05/2023";
    const result = parseDate(date);
    expect(result).toBe(expected);
  });
});
