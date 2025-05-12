import { LevUpDate } from "@/types/level";
import { Collapse, Text, Timeline } from "@mantine/core";
import { useEffect, useState } from "react";
import { ListAreaItem } from "./list-area-sub-item";

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
        {props.list?.map(({ date, label, sub }, i) => {
          return (
            <Timeline.Item
              variant="default"
              mt={"lg"}
              key={i}
              pt="0.2rem"
              bullet={
                <Text fw={500} size="xs">
                  lv{label}
                </Text>
              }
            >
              <ListAreaItem title={date} list={sub} />
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Collapse>
  );
}
