import { FlatLevUpData, GOAL_DONE } from "./constants";
import { getNow } from "./get-now";
import { LevUpDate } from "../types/level";
import { getStartGunSmokeDate } from "./get-start-gun-smoke-date";

export const getLevUpDateV3 = (
  cur: number,
  options?: {
    addUserCnt?: number;
    useAllMemberAdd?: boolean;
    isStartToday?: boolean;
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
  if (!options?.isStartToday) {
    now = now.add(1, "day");
  }
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
    const prePoint = point;

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

    // 필요 공헌도 도달
    if (point >= nextTarget.p) {
      // 도달 후 초과 포인트
      const remainPoint = point - nextTarget.p;
      // 필요했던 포인트
      const needPoint = nextTarget.p - prePoint;
      // 이전 인원 수
      const preMemberCount =
        FlatLevUpData[nextTargetIdx]?.m || FlatLevUpData[0].m;
      // 필요했던 인원 비율
      const userPercent = Math.ceil(
        preMemberCount * (needPoint / (remainPoint + needPoint))
      );

      const setList = (
        list: LevUpDate[],
        type: "SUB" | "MAIN",
        level: string,
        label: string,
        needCnt: number
      ) => {
        if (type === "SUB") {
          list[list.length - 1].sub.push({
            date: now.format("YYYY-MM-DD"),
            label,
            needCnt,
          });
        } else {
          list.push({
            date: now.format("YYYY-MM-DD"),
            label: level,
            sub: [
              {
                date: now.format("YYYY-MM-DD"),
                label,
                needCnt,
              },
            ],
          });
        }
      };

      setList(list, nextTarget.type, nextTarget.v, nextTarget.l, userPercent);

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
          setList(
            list,
            FlatLevUpData[i].type,
            FlatLevUpData[i].v,
            FlatLevUpData[i].l,
            userPercent
          );
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
