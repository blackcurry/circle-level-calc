import { LevUpDate } from "@/types/level";
import { getLevUpDate } from "@/utils/get-lev-up-date";
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
    const num = Number(point);

    if (!isNaN(num) && point !== "") {
      console.log(
        `1222memberCnt:${memberCnt}, point:${point},  check:${check}`
      );

      const addUserCnt = isNaN(Number(memberCnt)) ? 0 : Number(memberCnt);
      const maxMember = getMemberCount(point);
      setMaxMemberCnt(maxMember);

      const { list } = getLevUpDate(num, {
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
