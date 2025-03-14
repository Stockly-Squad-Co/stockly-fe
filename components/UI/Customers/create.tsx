"use client";
import Button from "@/components/Common/Button";
import FormContainer from "@/components/Common/Form/form-container";
import FormSection from "@/components/Common/Form/form-section";
import TextField from "@/components/Common/Inputs/text-field";
import Modal from "@/components/Common/Modal";
import { CreateCustomer } from "@/lib/@types";
import { useModal } from "@/lib/providers/ModalProvider";
import { createCustomer } from "@/lib/services/customer.service";
import { fetchStates } from "@/lib/services/store.service";
import { EMAIL_REGEX } from "@/lib/utils/regex";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = CreateCustomer;

interface Props {
  isModal?: boolean;
  onModalClose?: () => void;
  onSuccess?: () => void;
  modalClass?: string;
}

const CreateCustomerPage = ({
  isModal,
  onModalClose,
  onSuccess,
  modalClass,
}: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const { data: states } = useQuery({
    queryFn: fetchStates,
    queryKey: ["states"],
  });

  const { mutateAsync: _createCustomer, isPending: _creatingCustomer } =
    useMutation({
      mutationKey: ["customers", "create"],
      mutationFn: createCustomer,
      onSuccess() {
        toast.success("Customer created successfully");

        if (onSuccess) {
          onSuccess();
          return;
        }

        router.push("/customers");
      },
    });

  const onSubmit = (e: Inputs) => {
    _createCustomer(e);
  };

  const { hideModal } = useModal();

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:p-6 p-4">
        <FormContainer showBackButton={!isModal} title="Add new customer">
          <FormSection title="Customer Details">
            <div className="grid grid-cols-2 gap-2">
              <TextField
                label="First Name"
                InputProps={{
                  required: true,
                  placeholder: "First name",
                  ...register("firstName", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }),
                }}
                helperText={errors?.firstName?.message}
              />
              <TextField
                label="Last Name"
                InputProps={{
                  required: true,
                  placeholder: "Last name",
                  ...register("lastName", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }),
                }}
                helperText={errors?.lastName?.message}
              />
              <TextField
                label="Phone Number (Optional)"
                className="col-span-2"
                InputProps={{
                  required: false,
                  type: "tel",
                  inputMode: "tel",
                  placeholder: "e.g +2348023720580",
                  ...register("phoneNumber", {
                    pattern: {
                      value: /^\+234\d{10}$/,
                      message: "Enter a valid phone number",
                    },
                    validate(value, formValues) {
                      if (!value && !formValues.email) {
                        return "At least one of email or phone number is required";
                      }
                      return undefined;
                    },
                  }),
                }}
                helperText={errors?.phoneNumber?.message}
              />
              <TextField
                label="Email (Optional)"
                className="col-span-2"
                InputProps={{
                  required: false,
                  inputMode: "email",
                  placeholder: "e.g adejaredaniel12@gmail.com",
                  ...register("email", {
                    pattern: {
                      value: EMAIL_REGEX,
                      message: "Enter a valid email",
                    },
                    validate(value, formValues) {
                      if (!value && !formValues.phoneNumber) {
                        return "At least one of email or phone number is required";
                      }
                      return undefined;
                    },
                  }),
                }}
                helperText={errors?.email?.message}
              />

              <TextField
                label="Additional Information (Optional)"
                className="col-span-2"
                multiline={true}
                InputProps={{
                  required: false,
                  inputMode: "text",
                  ...register("additional_information", {
                    required: false,
                  }),
                }}
                helperText={errors?.email?.message}
              />
            </div>
          </FormSection>

          <FormSection title="Shipping Details">
            <div className="grid grid-cols-3 gap-2">
              <TextField
                className="col-span-3"
                label="Shipping Address (Optional)"
                InputProps={{
                  placeholder: "Address",
                  type: "text",
                  ...register("shipping_address.street_address"),
                }}
              />

              <div className="space-y-2">
                <label className="text-sm">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border text-sm ${
                    errors.shipping_address?.state
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  {...register("shipping_address.state", { required: true })}
                >
                  <option value="" className="text-gray-400" disabled selected>
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

              <TextField
                label="City"
                InputProps={{
                  placeholder: "City",
                  required: true,
                  type: "text",
                  ...register("shipping_address.city", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }),
                }}
                helperText={errors?.shipping_address?.message}
              />

              <TextField
                label="Zip Code"
                InputProps={{
                  placeholder: "Zip Code",
                  required: true,
                  type: "text",
                  ...register("shipping_address.zip_code", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }),
                }}
                helperText={errors?.shipping_address?.message}
              />
            </div>
          </FormSection>

          <div className="flex items-center gap-2 pb-3 pt-10 px-4 justify-end">
            <Button
              type="button"
              size="medium"
              variant="filled"
              className="bg-white text-primary hover:bg-white"
              onClick={reset}
            >
              Clear fields
            </Button>

            <Button
              className="text-black hover:bg-accent bg-accent"
              variant="filled"
              size="medium"
              loading={_creatingCustomer}
            >
              Add Customer
            </Button>
          </div>
        </FormContainer>
      </div>

      {/* 
  <FormFooter
    onReset={reset}
    submitButton={
      <Button
        className="text-white hover:bg-accent bg-accent"
        variant="filled"
        size="medium"
        loading={_creatingCustomer}
      >
        Add Customer
      </Button>
    }
  ></FormFooter> */}
    </form>
  );

  if (isModal)
    return (
      <Modal onClose={onModalClose || hideModal} className={modalClass || ""}>
        {renderForm()}
      </Modal>
    );

  return <div>{renderForm()}</div>;
};

export default CreateCustomerPage;
