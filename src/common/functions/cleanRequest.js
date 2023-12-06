export const cleanRequest = (object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, v]) => v !== null && v !== "")
  );
};
