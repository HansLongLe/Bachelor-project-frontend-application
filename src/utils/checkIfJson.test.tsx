import { isJsonString } from "./checkifJson";

describe("isJsonString function", () => {
  test("returns true for a valid JSON string", () => {
    const validJsonString = '{"key": "value"}';
    expect(isJsonString(validJsonString)).toBe(true);
  });

  test("returns false for an invalid JSON string", () => {
    const invalidJsonString = "not_a_json_string";
    expect(isJsonString(invalidJsonString)).toBe(false);
  });

  test("returns false for an empty string", () => {
    const emptyString = "";
    expect(isJsonString(emptyString)).toBe(false);
  });
});
