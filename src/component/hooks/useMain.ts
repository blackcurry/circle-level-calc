import { LevUpDate } from "@/types/level";
import { IS_TEST } from "@/utils/constants";
import { getLevUpDateV2 } from "@/utils/get-lev-up-date-v2";
import { getMemberCount } from "@/utils/get-max-member-cnt";
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
    if (IS_TEST) {
      setPoint(130030);
    }
  }, [setPoint]);

  useEffect(() => {
    const num = Number(point);

    if (!isNaN(num) && point !== "") {
      const addUserCnt = isNaN(Number(memberCnt)) ? 0 : Number(memberCnt);
      const maxMember = getMemberCount(point);
      setMaxMemberCnt(maxMember);

      const { list } = getLevUpDateV2(num, {
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
