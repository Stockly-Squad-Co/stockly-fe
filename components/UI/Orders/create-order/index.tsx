"use client";

import Button from "@/components/Common/Button";
import FormContainer from "@/components/Common/Form/form-container";
import FormSection from "@/components/Common/Form/form-section";
import SelectCustomers, {
  SelectedCustomerUI,
} from "@/components/Common/Inputs/select-customers";
import TextField from "@/components/Common/Inputs/text-field";
import { CreateOrder as CreateOrderType, OrderPickupType } from "@/lib/@types";
import { OrderPaymentStatus, PaymentMethod, SalesChannel } from "@/lib/enums";
import { useSidebar } from "@/lib/providers/SideDrawersProvider";
import useOrderStore from "@/lib/store/order.store";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SelectedProductsUI } from "./select-products";
import Image from "next/image";
import { formatNaira } from "@/lib/utils";
import { FaCheckCircle } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/lib/services/order.service";
import { toast } from "sonner";
import { paymentMethods } from "@/lib/data";
import { queryClient } from "@/lib/providers";
import { BiMinus, BiPlus } from "react-icons/bi";

const CreateOrder = () => {
  const { selectedCustomer, reset: resetStore } = useOrderStore();
  const { showSidebar } = useSidebar();

  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrderType>({
    defaultValues: {
      customer: selectedCustomer?._id || "",
      salesChannel: SalesChannel.PHYSICAL_SALE,
      orderDate: new Date().toISOString(),
      paymentMethod: PaymentMethod.BANK_TRANSFER,
      paymentStatus: "Paid",
      type: "PICKUP",
      cart: [],
    },
  });

  const [paymentMethod, paymentStatus] = [
    watch("paymentMethod"),
    watch("paymentStatus"),
  ];

  const {
    selectedProducts,
    checkExists,
    toggleProduct,
    increaseQuantity,
    decreaseQuantity,
  } = useOrderStore();

  const { mutate, isPending: loading } = useMutation({
    mutationFn: createOrder,
    mutationKey: ["createOrder"],
  });

  const onSubmit = (data: CreateOrderType) =>
    mutate(
      {
        ...data,
        customer: selectedCustomer?._id || "",
        cart: selectedProducts.map((p) => ({
          product: p._id,
          quantity: p?.quantity || 1,
        })),
      },
      {
        onSuccess: () => {
          reset();
          resetStore();
          toast.success("Order created successfully");
          queryClient.invalidateQueries({
            predicate: (q) => q.queryKey.includes("orders"),
          });
        },
        onError: (err) => toast.error(err?.message || "An error occurred"),
      }
    );

  return (
    <div>
      <FormContainer title="Create Order">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSection title="Order Details">
            <div className="space-y-4">
              <div className="space-y-4">
                {selectedCustomer ? (
                  <div className="space-y-1">
                    <p>Selected Customer</p>

                    <div className="flex items-center border gap-4 rounded-md border-gray-200 p-2 justify-between">
                      <div className="flex-grow">
                        <div>
                          <p className="text-sm font-medium">
                            {selectedCustomer.firstName}{" "}
                            {selectedCustomer.lastName}
                          </p>
                          <div className="text-xs text-gray-500">
                            <p>{selectedCustomer.email}</p>
                            <p>{selectedCustomer.phoneNumber}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        className="text-secondary font-medium text-sm"
                        onClick={() => showSidebar(<SelectedCustomerUI />)}
                        type="button"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <SelectCustomers />
                )}
              </div>

              <div className="space-y-2 ">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label className="block text-sm">
                      Sales Channel <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="salesChannel"
                      // rules={{ required: "Frequency is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="border p-3 w-full rounded"
                        >
                          {Object.values(SalesChannel).map((channel) => (
                            <option key={channel} value={channel}>
                              {channel}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors?.salesChannel && (
                      <p className="text-red-500 text-sm">
                        {errors.salesChannel.message}
                      </p>
                    )}
                  </div>

                  <div className={`space-y-2`}>
                    <label className="block text-sm">
                      Order Date
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("orderDate", {
                        required: "Date is required",
                      })}
                      className="border p-3 w-full rounded-md border-gray-200"
                    />
                    {errors.orderDate && (
                      <p className="text-red-500 text-sm">
                        {errors.orderDate.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection title={`Products (${selectedProducts.length})`}>
            <div className="py-2 space-y-2">
              <div className="grid grid-cols-3 gap-1 select-none">
                {selectedProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`border cursor-pointer rounded-md duration-300 relative p-2 ${
                      checkExists(product._id)
                        ? "border-accent"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    onClick={() => toggleProduct(product)}
                  >
                    {checkExists(product._id) && (
                      <FaCheckCircle className="text-accent absolute top-2 right-2" />
                    )}

                    <div className="flex gap-2">
                      <div className="size-12 relative rounded-md overflow-hidden">
                        <Image
                          src={product.display_image}
                          alt=""
                          width={100}
                          height={100}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                      </div>

                      <div className="text-sm">
                        <div>
                          <p>{product.name}</p>
                          <p>
                            {product.is_discounted ? (
                              <span>
                                {formatNaira(product.discountedPrice || 0)}{" "}
                                <span className="text-xs text-gray-400 line-through">
                                  {formatNaira(product.price)}
                                </span>
                              </span>
                            ) : (
                              `${formatNaira(product.price)}`
                            )}
                          </p>
                        </div>

                        <div className="flex items-center select-none text-sm">
                          <button
                            className="size-5 border rounded flex items-center justify-center"
                            type="button"
                            onClick={(e) => (
                              e.stopPropagation(), decreaseQuantity(product._id)
                            )}
                            disabled={product.quantity === 1}
                          >
                            <BiMinus />
                          </button>

                          <button className="size-5 flex items-center justify-center">
                            <span>{product.quantity || 1}</span>
                          </button>

                          <button
                            className="size-5 border rounded flex items-center justify-center"
                            type="button"
                            onClick={(e) => (
                              e.stopPropagation(), increaseQuantity(product._id)
                            )}
                          >
                            <BiPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => showSidebar(<SelectedProductsUI />)}
                >
                  Select Products
                </Button>
                {/* <Button>Add new Product</Button> */}
              </div>
            </div>
          </FormSection>

          <FormSection title="Payment" headerClass="px-3 py-1">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-sm">
                    Payment Status <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center gap-2 flex-wrap">
                    {["Paid", "Unpaid"].map((key, id) => (
                      <button
                        type="button"
                        key={id}
                        className={` text-sm duration-300 flex-shrink-0 capitalize px-4 py-2 rounded-md text-primary font-medium ${
                          paymentStatus === key
                            ? "bg-primary text-white"
                            : "bg-primary/5"
                        }`}
                        onClick={() => setValue("paymentStatus", key)}
                      >
                        {key.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border text-sm ${
                      errors.type ? "border-red-500" : "border-gray-200"
                    }`}
                    onChange={(e) =>
                      setValue(
                        "type",
                        e.target.value.toUpperCase() as OrderPickupType
                      )
                    }
                  >
                    <option
                      value=""
                      className="text-gray-400"
                      disabled
                      selected
                    >
                      Select delivery type
                    </option>
                    {["Pickup", "Delivery"].map((method) => (
                      <option key={method} value={method}>
                        {method.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {paymentStatus === "Paid" && (
                <div className="space-y-2">
                  <label className="text-sm">Payment Method</label>
                  <select
                    className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border text-sm ${
                      errors.paymentMethod
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    onChange={(e) =>
                      setValue("paymentMethod", e.target.value as PaymentMethod)
                    }
                  >
                    <option
                      value=""
                      className="text-gray-400"
                      disabled
                      selected
                    >
                      Select payment method
                    </option>
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-2">
                <Button type="submit" variant="accent" loading={loading}>
                  Create Order
                </Button>
              </div>
            </div>
          </FormSection>
        </form>
      </FormContainer>
    </div>
  );
};

export default CreateOrder;
