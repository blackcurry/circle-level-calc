import dayjs from "dayjs";

export const getNow = () => {
  return dayjs(); //.startOf("day"); //.add(-5, "hour");
};
