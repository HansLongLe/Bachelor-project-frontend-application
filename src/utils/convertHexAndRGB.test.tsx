import { rgb2hex } from "./convertHEXAndRGB";

describe("rgb2hex function", () => {
  test("converts RGB string to hex", () => {
    const rgbString = "rgb(255, 0, 128)";
    const expectedHex = "#FF0080";
    expect(rgb2hex(rgbString)).toBe(expectedHex);
  });

  test("handles RGB string with spaces", () => {
    const rgbStringWithSpaces = "rgb( 100 , 200 , 50 )";
    const expectedHex = "#64C832";
    expect(rgb2hex(rgbStringWithSpaces)).toBe(expectedHex);
  });

  test("handles uppercase RGB string", () => {
    const uppercaseRgbString = "RGB(50, 100, 150)";
    const expectedHex = "#326496";
    expect(rgb2hex(uppercaseRgbString)).toBe(expectedHex);
  });

  test("returns empty string for invalid RGB string", () => {
    const invalidRgbString = "not_an_rgb_string";
    expect(rgb2hex(invalidRgbString)).toBe("#");
  });

  test("returns empty string for empty string input", () => {
    const emptyString = "";
    expect(rgb2hex(emptyString)).toBe("");
  });
});
