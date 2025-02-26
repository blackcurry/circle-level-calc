"use client";

import { Anchor, Box, Button, Notification, Space, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  return (
    <Box p={"md"}>
      <Button
        variant="default"
        onClick={() => {
          router.push("/");
        }}
      >
        돌아가기
      </Button>
      <Space h={"md"} />
      <Title order={3}>이미지 출처</Title>
      <Space h={"md"} />
      <Notification title="파파샤 이미지" withCloseButton={false}>
        <Anchor
          href="https://gf2.haoplay.com/kr/roleinfo/?role=18"
          target="_blank"
        >
          https://gf2.haoplay.com/kr/roleinfo/?role=18
        </Anchor>
      </Notification>
      <Space h={"md"} />
      <Notification title="파나소전콘" withCloseButton={false}>
        <Anchor href="https://arca.live/e/43202" target="_blank">
          https://arca.live/e/43202
        </Anchor>
      </Notification>
      <Space h={"md"} />
      <Notification title="소녀전선2 수오미 대돚거콘" withCloseButton={false}>
        <Anchor href="https://arca.live/e/43641" target="_blank">
          https://arca.live/e/43641
        </Anchor>
      </Notification>
      <Space h={"md"} />
      <Notification title="소전 수오미 파파샤 짭밋다" withCloseButton={false}>
        <Anchor href="https://arca.live/e/42861 " target="_blank">
          https://arca.live/e/42861
        </Anchor>
      </Notification>
      <Space h={"md"} />
    </Box>
  );
}
