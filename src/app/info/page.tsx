import GoMainButton from "@/component/common/go-main-button";
import Info from "@/component/info";
import { Box, Flex } from "@mantine/core";

export default function page() {
  return (
    <>
      <Box pt={"md"} px={"md"}>
        <GoMainButton />
      </Box>
      <Flex direction={"column"} align={"center"}>
        <Info />
      </Flex>
    </>
  );
}
