import { LevUpDate } from "@/types/level";
import { Collapse, Text, Timeline, Title } from "@mantine/core";
import { useEffect, useState } from "react";

export function ListArea(props: { list?: LevUpDate[] }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (props.list?.length) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [props.list]);

  return (
    <Collapse in={open}>
      <Timeline active={99} bulletSize={30} lineWidth={4}>
        {props.list?.map(({ date, level }, i) => {
          return (
            <Timeline.Item
              mt={"lg"}
              key={i}
              pt="0.2rem"
              bullet={
                <Text fw={500} size="xs">
                  lv{level}
                </Text>
              }
            >
              <Title order={4}>{date}</Title>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Collapse>
  );
}
