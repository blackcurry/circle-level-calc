import About from "@/component/about";
import GoMainButton from "@/component/common/go-main-button";
import { Box } from "@mantine/core";

export default function page() {
  return (
    <>
      <Box pt={"md"} px={"md"}>
        <GoMainButton />
      </Box>
      <About />
    </>
  );
}
