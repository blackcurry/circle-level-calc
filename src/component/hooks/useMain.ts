import { LevUpDate } from "@/types/level";
import { getLevUpDateV3 } from "@/utils/get-lev-up-date-v3";
import { getMemberCount } from "@/utils/get-max-member-cnt";
import { isCoTest } from "@/utils/is-test";
import { useDebouncedState } from "@mantine/hooks";
import { ChangeEvent, useEffect, useState } from "react";

export const useMainData = () => {
  const [point, setPoint] = useDebouncedState<string | number>("", 500);
  const [memberCnt, setMemberCnt] = useDebouncedState<number | string>("", 500);
  const [checkMoreHit, setCheckMoreHit] = useState(false);
  const [checkToday, setCheckToday] = useState(false);
  const [maxMemberCnt, setMaxMemberCnt] = useState<number>(0);
  const [list, setList] = useState<LevUpDate[]>([]);

  const handleChangeCheckMoreHit = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckMoreHit(e.currentTarget.checked);
  };

  const handleChangeCheckToday = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckToday(e.currentTarget.checked);
  };

  useEffect(() => {
    if (isCoTest()) {
      setPoint(130030);
    }
  }, [setPoint]);

  useEffect(() => {
    const num = Number(point);

    if (!isNaN(num) && point !== "") {
      const addUserCnt = isNaN(Number(memberCnt)) ? 0 : Number(memberCnt);
      setMaxMemberCnt(getMemberCount(point));

      const { list } = getLevUpDateV3(num, {
        addUserCnt,
        useAllMemberAdd: checkMoreHit,
        isStartToday: checkToday,
      });
      setList(list);
    } else {
      setList([]);
    }
  }, [memberCnt, point, checkMoreHit, checkToday]);

  useEffect(() => {
    setMemberCnt("");
  }, [checkMoreHit, setMemberCnt]);

  return {
    point,
    memberCnt: checkMoreHit ? "" : memberCnt,
    maxMemberCnt,
    list,
    checkMoreHit,
    checkToday,
    handleChangeMemCnt: setMemberCnt,
    handleChangePoint: setPoint,
    handleChangeCheckMoreHit,
    handleChangeCheckToday,
  };
};
