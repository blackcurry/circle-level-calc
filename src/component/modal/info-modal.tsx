"use client";

import { Modal } from "@mantine/core";
import Info from "../info";
import { useRouter } from "next/navigation";

export default function InfoModal() {
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
      <Info />
    </Modal>
  );
}
