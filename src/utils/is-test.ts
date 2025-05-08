export const isCoTest = () => {
  return process.env.NEXT_PUBLIC_CO_TEST === "1";
};
