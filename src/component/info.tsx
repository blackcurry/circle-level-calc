import { Flex, Space, Text } from "@mantine/core";
import Image from "next/image";
import InfoImg1 from "../../public/info1.jpg";
import InfoImg2 from "../../public/info2.jpg";
import PPS1 from "../../public/pps1.webp";
import PPS5 from "../../public/pps5.webp";
import SubInfo1 from "../../public/sub-info1.png";

export default function Info() {
  return (
    <Flex direction="column" p={"sm"} align={"center"}>
      <Image src={InfoImg2} alt="info1" width="318" />
      <Space h={"xs"} />
      <Text size="sm" fw={700}>
        경험치는 메인이 아니라
      </Text>
      <Text size="sm" fw={700}>
        돋보기 눌러서 상세화면 들어가서 확인해야해
      </Text>
      <Space h={"xs"} />
      <Image src={InfoImg1} alt="info2" width="318" />
      <Space h={"xs"} />
      <Text size="sm" fw={700}>
        위의 경우 120850 입력
      </Text>
      <Space h={"xl"} />
      <Image src={SubInfo1} alt="sub-info1" width="318" />
      <Space h={"xs"} />
      <Text size="sm" fw={700}>
        툴팁의 []안 숫자는 해당 날짜에 괄호수 만큼
      </Text>
      <Text size="sm" fw={700}>
        클원이 활동(과업, 흙먼지)해야 달성한다는 뜻
      </Text>
      <Space h={"xl"} />
      <Flex justify={"space-between"} w="318">
        <Image src={PPS1} width={150} alt="pps1" />
        <Image src={PPS5} width={150} alt="PPS5" />
      </Flex>
    </Flex>
  );
}
