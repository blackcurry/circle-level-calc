import { FlatLevUpData, GOAL_DONE } from "./constants";
import { getNow } from "./get-now";
import { LevUpDate } from "../types/level";
import { getStartGunSmokeDate } from "./get-start-gun-smoke-date";

export const getLevUpDateV3 = (
  cur: number,
  options?: {
    addUserCnt?: number;
    useAllMemberAdd?: boolean;
  }
): { list: LevUpDate[]; cnt: number } => {
  let nextTargetIdx = FlatLevUpData.findIndex(({ p }) => p > cur);
  if (nextTargetIdx === -1) {
    return {
      list: [],
      cnt: 0,
    };
  }

  let now = getNow();
  let start = getStartGunSmokeDate();
  let end = start.add(7, "day");
  let point = cur;

  let cnt = 0;
  const list: LevUpDate[] = [];

  // 다음이 서브일때 메인 찾아서 초기값 세팅
  if (FlatLevUpData[nextTargetIdx].type === "SUB") {
    if (FlatLevUpData[nextTargetIdx - 1].type === "MAIN") {
      list.push({
        label: FlatLevUpData[nextTargetIdx - 1].v,
        date: GOAL_DONE,
        sub: [
          {
            label: FlatLevUpData[nextTargetIdx - 1].l,
            date: GOAL_DONE,
          },
        ],
      });
    } else if (FlatLevUpData[nextTargetIdx - 2].type === "MAIN") {
      list.push({
        label: FlatLevUpData[nextTargetIdx - 2].v,
        date: GOAL_DONE,
        sub: [
          {
            label: FlatLevUpData[nextTargetIdx - 2].l,
            date: GOAL_DONE,
          },
          {
            label: FlatLevUpData[nextTargetIdx - 1].l,
            date: GOAL_DONE,
          },
        ],
      });
    }
  }

  const lastPoint = FlatLevUpData[FlatLevUpData.length - 1];
  while (point <= lastPoint.p && nextTargetIdx > -1) {
    const nextTarget = FlatLevUpData[nextTargetIdx];
    const { m } = nextTarget;

    // 과업
    point += m * 40;
    // 흙먼지중
    if (start.diff(now, "hour") <= 0 && end.diff(now, "hour") >= 0) {
      point += m * 30 * 2;
      if (options?.useAllMemberAdd) {
        point += m * 30;
      } else if (options?.addUserCnt) {
        point += options?.addUserCnt * 30;
      }
    }

    // 흙먼지 지나면 다음 흙먼지로
    if (end.diff(now, "day") < 0) {
      start = start.add(3, "week");
      end = start.add(7, "day").set("hour", 2);
    }
    if (point >= nextTarget.p) {
      if (nextTarget.type === "SUB") {
        list[list.length - 1].sub.push({
          date: now.format("YYYY-MM-DD"),
          label: nextTarget.l,
        });
      } else {
        list.push({
          date: now.format("YYYY-MM-DD"),
          label: nextTarget.v,
          sub: [{ date: now.format("YYYY-MM-DD"), label: nextTarget.l }],
        });
      }

      const getNextIdx = (idx: number) => {
        const data = FlatLevUpData[idx];
        if (data?.p <= point) {
          return getNextIdx(idx + 1);
        }
        return idx;
      };
      const calcNextIdx = getNextIdx(nextTargetIdx + 1);
      if (calcNextIdx > nextTargetIdx + 1) {
        for (let i = nextTargetIdx + 1; i < calcNextIdx; i++) {
          if (FlatLevUpData[i].type === "SUB") {
            list[list.length - 1].sub.push({
              date: now.format("YYYY-MM-DD"),
              label: FlatLevUpData[i].l,
            });
          } else {
            list.push({
              date: now.format("YYYY-MM-DD"),
              label: FlatLevUpData[i].v,
              sub: [
                { date: now.format("YYYY-MM-DD"), label: FlatLevUpData[i].l },
              ],
            });
          }
        }
      }
      nextTargetIdx = calcNextIdx;
    }
    cnt += 1;
    now = now.add(1, "day"); // 하루 추가
  }

  return {
    list,
    cnt,
  };
};
