import { LevUpDate } from "@/types/level";
import { Badge, Collapse, Text, Timeline, Title } from "@mantine/core";
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
              variant="default"
              mt={"lg"}
              key={i}
              pt="0.2rem"
              bullet={
                <Text fw={500} size="xs">
                  lv{level}
                </Text>
              }
            >
              <Badge variant="default" h={"lg"}>
                <Title order={5}>{date}</Title>
              </Badge>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Collapse>
  );
}
