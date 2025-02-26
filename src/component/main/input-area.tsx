import { ActionIcon, Checkbox, Group, NumberInput } from "@mantine/core";
import { ChangeEventHandler } from "react";
import Link from "next/link";
import { IconQuestionMark } from "@tabler/icons-react";

export function InputArea(props: {
  point: string | number;
  memberCnt: string | number;
  maxMemberCnt: number;
  check: boolean;
  onChangePoint: (value: number | string) => void;
  onChangeMemberCnt: (cnt: number | string) => void;
  onChangeCheck?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <Group>
      <Group>
        <NumberInput
          placeholder="점수(최대3,722,960)"
          min={0}
          max={3722960}
          value={props.point}
          onChange={props.onChangePoint}
          rightSection={<></>}
          clampBehavior="strict"
        />
        <ActionIcon component={Link} variant="default" href={"/info"}>
          <IconQuestionMark />
        </ActionIcon>
      </Group>
      <Group>
        <NumberInput
          placeholder="3타인원수"
          min={0}
          max={props.maxMemberCnt}
          value={props.memberCnt}
          onChange={props.onChangeMemberCnt}
          rightSection={<></>}
          disabled={props.check}
          clampBehavior="strict"
        />
        <Checkbox
          label="전원3타"
          checked={props.check}
          onChange={props.onChangeCheck}
        />
      </Group>
    </Group>
  );
}
