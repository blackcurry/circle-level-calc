import { ActionIcon, Checkbox, Flex, Group, NumberInput } from "@mantine/core";
import { ChangeEventHandler } from "react";
import Link from "next/link";
import { IconQuestionMark } from "@tabler/icons-react";

export function InputArea(props: {
  point: string | number;
  memberCnt: string | number;
  maxMemberCnt: number;
  checkMoreHit: boolean;
  checkToday: boolean;
  onChangePoint: (value: number | string) => void;
  onChangeMemberCnt: (cnt: number | string) => void;
  onChangeCheckMoreHit?: ChangeEventHandler<HTMLInputElement>;
  onChangeCheckToday?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <Group>
      <Group>
        <Flex
          direction={"row"}
          align={"center"}
          justify={"space-around"}
          gap={"md"}
        >
          <NumberInput
            placeholder="경험치(최대3,722,960)"
            min={0}
            max={3722960}
            value={props.point}
            onChange={props.onChangePoint}
            rightSection={<></>}
            clampBehavior="strict"
            style={{ flexShrink: 1 }}
          />
          <ActionIcon component={Link} variant="default" href={"/info"}>
            <IconQuestionMark />
          </ActionIcon>
          <Checkbox
            label="오늘부터"
            checked={props.checkToday}
            onChange={props.onChangeCheckToday}
            style={{ flexShrink: 0 }}
          />
        </Flex>
      </Group>
      <Group>
        <NumberInput
          placeholder="3타인원수"
          min={0}
          max={props.maxMemberCnt}
          value={props.memberCnt}
          onChange={props.onChangeMemberCnt}
          rightSection={<></>}
          disabled={props.checkMoreHit}
          clampBehavior="strict"
        />
        <Checkbox
          label="전원3타"
          checked={props.checkMoreHit}
          onChange={props.onChangeCheckMoreHit}
        />
      </Group>
    </Group>
  );
}
