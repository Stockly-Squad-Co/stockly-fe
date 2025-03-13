import { SubmitHandler, useForm } from "react-hook-form";
import { useModal } from "../../../lib/providers/ModalProvider";
import Modal from "../../Common/Modal";
import { Order } from "../../../lib/@types";
import { useState } from "react";
import { checkout, fetchStates } from "../../../lib/services/store.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import useCartStore from "../../../lib/store/cart.store";
import { useParams } from "next/navigation";
import { IoBagCheckOutline } from "react-icons/io5";
import { toast } from "sonner";

type OrderDetails = Omit<Order, "cart" | "orderDate">;

const CheckoutModal = () => {
  const { hideModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OrderDetails>();

  const { data: states } = useQuery({
    queryFn: fetchStates,
    queryKey: ["states"],
  });

  const [step, setStep] = useState(1);
  const [type, setType] = useState<"PICKUP" | "DELIVERY">("PICKUP");

  const updateType = (type: "PICKUP" | "DELIVERY") => {
    setType(type);
    setValue("type", type);
  };

  const { slug } = useParams();

  const { items, clearCart } = useCartStore();

  const { mutate, isPending: loading } = useMutation({
    mutationFn: checkout,
    mutationKey: ["checkout"],
  });

  const submit: SubmitHandler<OrderDetails> = (data) =>
    mutate(
      {
        body: {
          ...data,
          cart: items.map((item) => ({
            product: item._id,
            quantity: item.quantity || 0,
          })),
          orderDate: new Date().toISOString(),
          type,
        },
        slug: `${slug}`,
      },
      {
        onSuccess: (url) => {
          toast.success("Checkout successful");
          clearCart();
          hideModal();
          window.location.href = url;
        },
        onError: (err) => toast.error(err.message),
      }
    );

  return (
    <Modal
      onClose={hideModal}
      className="bg-white shadow-2xl rounded-xl p-5 md:w-[50vw] overflow-y-auto relative max-h-[90vh]"
    >
      <div className="space-y-3">
        <p className="text-2xl font-bold text-center">Complete Checkout</p>
        <form onSubmit={handleSubmit(submit)}>
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-lg font-semibold">Details</p>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-1">
                  <label className="text-sm">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="border rounded-lg p-3 block w-full"
                    placeholder="John"
                    {...register("customer.firstName", { required: true })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="border rounded-lg p-3 block w-full"
                    placeholder="Doe"
                    {...register("customer.lastName", { required: true })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="border rounded-lg p-3 block w-full"
                    placeholder="+234..."
                    {...register("customer.phoneNumber", { required: true })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="border rounded-lg p-3 block w-full"
                    placeholder="johndoe@example.com"
                    {...register("customer.email", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-lg font-semibold">Address</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 capitalize rounded-lg border text-sm ${
                      errors.address?.state
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    {...register("address.state", { required: true })}
                  >
                    <option
                      value=""
                      className="text-gray-400"
                      disabled
                      selected
                    >
                      Select a state
                    </option>
                    {states?.map((state) => (
                      <option
                        key={state._id}
                        value={state._id}
                        className="capitalize"
                      >
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm">
                    L.G.A <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
                      errors.address?.city
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    placeholder="City"
                    {...register("address.city", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">
                    Zip Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
                      errors.address?.zip_code
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    placeholder="Zip Code"
                    {...register("address.zip_code", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">
                    Street Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
                      errors.address?.street_address
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    placeholder="Street Address"
                    {...register("address.street_address", {
                      required: true,
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm">
                Order Type <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`w-full border py-2 select-none duration-300 cursor-pointer text-center rounded-md ${
                    type === "PICKUP"
                      ? "bg-secondary text-white border-transparent"
                      : "border-primary"
                  }`}
                  role="button"
                  onClick={() => updateType("PICKUP")}
                >
                  PICKUP
                </div>
                <div
                  className={`w-full border py-2 select-none duration-300 cursor-pointer text-center rounded-md ${
                    type === "DELIVERY"
                      ? "bg-secondary text-white border-transparent"
                      : "border-primary"
                  }`}
                  role="button"
                  onClick={() => updateType("DELIVERY")}
                >
                  DELIVERY
                </div>
              </div>
            </div>

            <button
              className="bg-accent font-medium gap-2 text-black w-full rounded-md py-3 flex items-center justify-center duration-300  disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <span>{loading ? "Loading..." : "Checkout"}</span>

              <IoBagCheckOutline size={18} />
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
