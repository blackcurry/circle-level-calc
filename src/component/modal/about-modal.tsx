"use client";

import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import About from "../about";

export default function AboutModal() {
  const router = useRouter();
  return (
    <Modal
      opened={true}
      onClose={() => {}}
      onClick={() => {
        router.back();
      }}
      closeOnClickOutside
      withCloseButton={false}
    >
      <About />
    </Modal>
  );
}
