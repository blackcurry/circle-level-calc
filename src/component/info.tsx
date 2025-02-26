import { Box, Flex, Space, Text } from "@mantine/core";
import Image from "next/image";
import InfoImg1 from "../../public/info1.jpg";
import InfoImg2 from "../../public/info2.jpg";
import PPS1 from "../../public/pps1.webp";
import PPS5 from "../../public/pps5.webp";

export default function Info() {
  return (
    <Box p={"md"}>
      <Image src={InfoImg2} alt="info1" width="320" />
      <Space h={"xs"} />
      <Text size="sm" fw={700}>
        경험치는 메인이 아니라 돋보기 눌러서 상세화면 들어가서 확인해야해
      </Text>
      <Space h={"xs"} />
      <Image src={InfoImg1} alt="info2" width="320" />
      <Space h={"xs"} />
      <Text size="sm" fw={700}>
        위의 경우 120850 입력
      </Text>
      <Space h={"xl"} />
      <Flex justify={"space-between"} w="320">
        <Image src={PPS1} width={150} alt="pps1" />
        <Image src={PPS5} width={150} alt="PPS5" />
      </Flex>
    </Box>
  );
}
