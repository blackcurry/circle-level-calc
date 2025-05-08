import dayjs, { Dayjs } from "dayjs";
import { getNow } from "./get-now";

export const getStartGunSmokeDate = () => {
  return calcGunSmokeDate(dayjs("2025-05-04").add(5, "hour"));
};

const calcGunSmokeDate = (start: Dayjs) => {
  const now = getNow();
  const end = start.add(6, "day");

  if (
    start.diff(now, "hour") > 0 ||
    (start.diff(now, "hour") <= 0 && end.diff(now, "hour") >= 0)
  ) {
    return start;
  }

  return calcGunSmokeDate(start.add(3, "week"));
};
