import { SubmitHandler, useForm } from "react-hook-form";
import { useModal } from "../../../lib/providers/ModalProvider";
import Modal from "../../Common/Modal";
import { Order } from "../../../lib/@types";

type OrderDetails = Omit<Order, "cart">;

const CheckoutModal = () => {
  const { hideModal } = useModal();

  const { register, handleSubmit } = useForm();

  const submit: SubmitHandler<OrderDetails> = (data) => {};

  return (
    <Modal
      onClose={hideModal}
      className="bg-white shadow-2xl rounded-xl p-5 md:w-[60vw] overflow-y-auto relative"
    ></Modal>
  );
};

export default CheckoutModal;
