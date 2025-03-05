import { Badge, Flex, Text, Title, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { forwardRef } from "react";

export function ListAreaItem(props: {
  title: string;
  list: { label: string; date: string }[];
}) {
  return (
    <Badge variant="default" h={"lg"} p={"sm"}>
      <Flex align="center">
        <Title order={5} mr={"xs"}>
          {props.title}
        </Title>
        <Tooltip
          variant="default"
          multiline
          position="bottom-start"
          events={{ hover: true, focus: false, touch: true }}
          label={
            <Flex>
              <Flex direction="column">
                {props.list.map(({ date, label }, i) => {
                  return (
                    <Text
                      variant="default"
                      key={i}
                      size="sm"
                    >{`${date}:  ${label}`}</Text>
                  );
                })}
              </Flex>
            </Flex>
          }
        >
          <IconInfoCircle size={16} />
        </Tooltip>
      </Flex>
    </Badge>
  );
}

const MyBadge = forwardRef<HTMLDivElement, { color: string }>(
  ({ color }, ref) => (
    <div ref={ref} color={color}>
      Badge
    </div>
  )
);

MyBadge.displayName = "MyBadge";
