"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function GoMainButton() {
  const router = useRouter();

  return (
    <Button
      variant="default"
      onClick={() => {
        router.push("/");
      }}
    >
      메인으로
    </Button>
  );
}
