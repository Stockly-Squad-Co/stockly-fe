"use client";

import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/ModalProvider";

const UpgradePlanModal = () => {
  const { hideModal } = useModal();

  return (
    <Modal
      onClose={hideModal}
      className="bg-white rounded-lg shadow-2xl md:min-w-[60vh] mx-auto p-5"
    >
      <div className="space-y-5">
        <p className="text-center text-xl">Upgrade Plan</p>
      </div>
    </Modal>
  );
};

export default UpgradePlanModal;
