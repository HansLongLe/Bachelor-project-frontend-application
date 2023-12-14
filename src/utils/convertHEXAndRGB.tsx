export const rgb2hex = (c: string): string => {
  return c.length
    ? "#" +
        (c.match(/\d+/g) || [])
          .map((x) => (+x).toString(16).padStart(2, "0"))
          .join("")
          .toLocaleUpperCase()
    : "";
};
