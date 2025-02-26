"use client";

import { AppShell, Flex, Group, Space } from "@mantine/core";
import { InputArea } from "./input-area";
import { ListArea } from "./list-area";
import { useMainData } from "./hooks/useMain";
import Image from "next/image";
// import bg from "../../public/bg.webp";
import bg from "../../public/bg-6.png";
// import pps4 from "../../public/pps4.jpg";

export function Main() {
  const {
    list,
    point,
    memberCnt,
    maxMemberCnt,
    check,
    handleChangeMemCnt,
    handleChangePoint,
    handleChangeCheck,
  } = useMainData();

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 20 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          {/* <Image src={pps4} width={50} height={50} alt="pps4" /> */}
          {/* <Title order={2}>서클 레벨 계산기</Title> */}
        </Group>
      </AppShell.Header>

      <AppShell.Main pos={"relative"} mah={"100dvh - 80px"}>
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
            top: "55%",
            transform: "translate(-50%, -50%)", // 가운데 정렬
            objectFit: "contain",
            opacity: "0.2",
          }}
          priority
        />
        <Flex flex={1} direction={"row"} justify={"center"}>
          <Flex direction={"column"}>
            <InputArea
              point={point}
              maxMemberCnt={maxMemberCnt}
              memberCnt={memberCnt}
              check={check}
              onChangePoint={handleChangePoint}
              onChangeMemberCnt={handleChangeMemCnt}
              onChangeCheck={handleChangeCheck}
            />
            {/* <Flex justify={"center"}> */}
            <ListArea list={list} />
            {/* </Flex> */}
          </Flex>
        </Flex>
      </AppShell.Main>
      <AppShell.Footer>
        <Space h={"md"} />
      </AppShell.Footer>
    </AppShell>
  );
}
