import { LevUpDate } from "@/types/level";
import { getLevUpDateV3 } from "@/utils/get-lev-up-date-v3";
import { getMemberCount } from "@/utils/get-max-member-cnt";
import { isCoTest } from "@/utils/is-test";
import { useDebouncedState } from "@mantine/hooks";
import { ChangeEvent, useEffect, useState } from "react";

export const useMainData = () => {
  const [point, setPoint] = useDebouncedState<string | number>("", 500);
  const [memberCnt, setMemberCnt] = useDebouncedState<number | string>("", 500);
  const [check, setChecked] = useState(false);
  const [maxMemberCnt, setMaxMemberCnt] = useState<number>(0);
  const [list, setList] = useState<LevUpDate[]>([]);

  const handleChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
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
        useAllMemberAdd: check,
      });
      setList(list);
    } else {
      setList([]);
    }
  }, [memberCnt, point, check]);

  useEffect(() => {
    setMemberCnt("");
  }, [check, setMemberCnt]);

  return {
    point,
    memberCnt: check ? "" : memberCnt,
    maxMemberCnt,
    list,
    check,
    handleChangeMemCnt: setMemberCnt,
    handleChangePoint: setPoint,
    handleChangeCheck,
  };
};
