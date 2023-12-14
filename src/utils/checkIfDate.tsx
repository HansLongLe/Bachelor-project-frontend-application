export const checkIfDateTime = (value: string) => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};
