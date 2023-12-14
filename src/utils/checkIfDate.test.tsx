import { checkIfDateTime } from "./checkIfDate";

describe("checkIfDateTime function", () => {
  test("returns true for a valid date-time string", () => {
    const validDateTimeString = "2023-12-31T12:30:00";
    expect(checkIfDateTime(validDateTimeString)).toBe(true);
  });

  test("returns false for an invalid date-time string", () => {
    const invalidDateTimeString = "not_a_date_time_string";
    expect(checkIfDateTime(invalidDateTimeString)).toBe(false);
  });

  test("returns false for an empty string", () => {
    const emptyString = "";
    expect(checkIfDateTime(emptyString)).toBe(false);
  });
});
