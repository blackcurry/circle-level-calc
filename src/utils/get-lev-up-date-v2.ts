import { LEVEL_ADD, UP_POINT_V2 } from "./constants";
import { getNow } from "./get-now";
import { LevUpDate } from "@/types/level";
import { getStartGunSmokeDate } from "./get-start-gun-smoke-date";

type UP_DATA = (typeof UP_POINT_V2)[number];

const getInit = (
  data: UP_DATA
): {
  goal: UP_DATA;
  subGoal: UP_DATA["s"];
  memCnt: number;
  levInfo: Omit<LevUpDate, "sub">;
  subInfo: LevUpDate["sub"];
} => {
  return {
    goal: data || { p: 0 },
    subGoal: data?.s.slice() || [],
    memCnt: data?.m || 0,
    // 메인레벨
    levInfo: {
      label: "",
      date: "",
    },
    // 중간단계
    subInfo: [],
  };
};

export const getLevUpDateV2 = (
  cur: number,
  options?: {
    addUserCnt?: number;
    useAllMemberAdd?: boolean;
  }
): { list: LevUpDate[]; cnt: number } => {
  let nextUpIdx = UP_POINT_V2.findIndex(({ p }) => p >= cur);
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

  let { goal, subGoal, memCnt, levInfo, subInfo } = getInit(
    UP_POINT_V2[nextUpIdx]
  );

  let cnt = 0;
  const list = [];

  while (point <= goal.p || subGoal.length) {
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

    // 중간 단계
    if (subGoal.length) {
      const index = subGoal.findIndex(({ p }) => point >= p);
      if (index > -1) {
        console.log("sub>> ", now.format("YYYY-MM-DD"), subGoal[index].l);
        subInfo.push({
          label: subGoal[index].l,
          date: now.format("YYYY-MM-DD"),
        });
        subGoal.splice(index, 1);
      }
    }

    if (!levInfo.label && point >= goal.p) {
      // 레벨 경험치 도달
      levInfo.label = String(nextUpIdx + LEVEL_ADD).padStart(2);
      levInfo.date = now.format("YYYY-MM-DD");
    }

    if (point >= goal.p && subGoal.length === 0) {
      list.push({
        ...levInfo,
        sub: [{ label: goal.l, date: levInfo.date }, ...subInfo],
      });

      // 다음 레벨 정보 및 초기화
      nextUpIdx += 1;
      const nextData = getInit(UP_POINT_V2[nextUpIdx]);
      goal = nextData.goal;
      subGoal = nextData.subGoal;
      memCnt = nextData.memCnt;
      levInfo = nextData.levInfo;
      subInfo = nextData.subInfo;
    }

    cnt += 1;
    now = now.add(1, "day"); // 하루 추가
  }

  return {
    list,
    cnt,
  };
};
