import { LEVEL_ADD, MEMBER_COUNT, UP_POINT } from "./constants";
import { getNow } from "./get-now";
import { LevUpDate } from "@/types/level";
import { getStartGunSmokeDate } from "./get-start-gun-smoke-date";

export const getLevUpDate = (
  cur: number,
  options?: {
    addUserCnt?: number;
    useAllMemberAdd?: boolean;
  }
): { list: LevUpDate[]; cnt: number } => {
  let nextUpIdx = UP_POINT.findIndex((goal) => goal > cur);
  if (nextUpIdx === -1) {
    return {
      list: [],
      cnt: 0,
    };
  }

  let now = getNow();
  let start = getStartGunSmokeDate();
  let end = start.add(7, "day");

  let point = cur;
  let goal = UP_POINT[nextUpIdx];
  let memCnt = MEMBER_COUNT[nextUpIdx - 1];

  let cnt = 0;
  const list = [];

  while (point <= goal) {
    // 과업
    point += memCnt * 40;
    // 흙먼지중
    if (start.diff(now, "hour") <= 0 && end.diff(now, "hour") >= 0) {
      point += memCnt * 30 * 2;
      if (options?.useAllMemberAdd) {
        point += memCnt * 30;
      } else if (options?.addUserCnt) {
        point += options?.addUserCnt * 30;
      }
    }

    // 흙먼지 지나면 다음 흙먼지로
    if (end.diff(now, "day") < 0) {
      start = start.add(3, "week");
      end = start.add(7, "day").set("hour", 2);
    }

    // 경험치 도달
    if (point >= goal) {
      list.push({
        level: String(nextUpIdx + LEVEL_ADD).padStart(2),
        date: now.format("YYYY-MM-DD"),
      });

      // 다음 레벨 경험치 & 다음 멤버수
      nextUpIdx += 1;
      goal = UP_POINT[nextUpIdx] || 0;
      memCnt = MEMBER_COUNT[nextUpIdx];
    }
    cnt += 1;
    now = now.add(1, "day"); // 하루 추가
  }

  return {
    list,
    cnt,
  };
};
