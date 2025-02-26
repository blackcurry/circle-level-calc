import { MEMBER_COUNT, UP_POINT } from "./constants";

export const getMemberCount = (point?: string | number) => {
  const num = Number(point);
  if (!isNaN(num)) {
    const currentIdx = UP_POINT.findIndex((goal) => goal > num);
    if (currentIdx > -1) {
      return MEMBER_COUNT[currentIdx];
    }
  }

  return 0;
};
