"use client";

import { AppShell, Button, Flex, Group, Title } from "@mantine/core";
import { InputArea } from "./main/input-area";
import { ListArea } from "./main/list-area";
import { useMainData } from "./hooks/useMain";
import Image from "next/image";
import bg from "../../public/bg.webp";

import Link from "next/link";
import pps4 from "../../public/pps4.jpg";
import { isCoTest } from "@/utils/is-test";

export function Main() {
  const {
    list,
    point,
    memberCnt,
    maxMemberCnt,
    checkMoreHit,
    checkToday,
    handleChangeMemCnt,
    handleChangePoint,
    handleChangeCheckMoreHit,
    handleChangeCheckToday,
  } = useMainData();

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 30 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          {!isCoTest() && (
            <>
              <Image src={pps4} width={50} height={50} alt="pps4" />
              <Title order={2}>서클 레벨 계산기</Title>
            </>
          )}
        </Group>
      </AppShell.Header>

      <AppShell.Main pos={"relative"} mah={"100dvh - 90px"}>
        {!isCoTest() && (
          <Image
            src={bg}
            alt="bg"
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              minWidth: "100vw",
              minHeight: "100vh",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)", // 가운데 정렬
              objectFit: "contain",
              opacity: "0.25",
            }}
            priority
          />
        )}

        <Flex flex={1} direction={"row"} justify={"center"}>
          <Flex direction={"column"}>
            <InputArea
              point={point}
              maxMemberCnt={maxMemberCnt}
              memberCnt={memberCnt}
              checkMoreHit={checkMoreHit}
              checkToday={checkToday}
              onChangePoint={handleChangePoint}
              onChangeMemberCnt={handleChangeMemCnt}
              onChangeCheckMoreHit={handleChangeCheckMoreHit}
              onChangeCheckToday={handleChangeCheckToday}
            />
            <ListArea list={list} />
          </Flex>
        </Flex>
      </AppShell.Main>
      <AppShell.Footer>
        <Flex justify={"end"}>
          <Button component={Link} href="/about" variant="default" size="xs">
            About
          </Button>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
