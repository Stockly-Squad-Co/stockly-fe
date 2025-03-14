"use client";

import FormContainer from "@/components/Common/Form/form-container";
import { ExpenseFormValues } from "@/lib/@types";
import { ExpenseFrequency, ExpensesType } from "@/lib/utils/enums";
import { Controller, useForm } from "react-hook-form";

const CreateExpense = () => {
  const { register, handleSubmit, control, watch } = useForm<ExpenseFormValues>(
    {
      defaultValues: {
        name: "",
        description: "",
        type: ExpensesType.PERIODIC,
        frequency: ExpenseFrequency.DAILY,
        startDate: new Date().toISOString(),
        amount: 0,
        payee: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          note: "",
          bankName: "",
          accountNumber: "",
          accountName: "",
          bankCode: "",
        },
      },
    }
  );

  const type = watch("type");

  const onSubmit = (data: ExpenseFormValues) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="mt-4 space-y-4">
      <FormContainer title="Create Expense">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name")}
                  className="border p-2 w-full rounded-md border-gray-200"
                  placeholder="Expense name"
                />
              </div>
              <div className="space-y-1">
                <label className="block">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("amount")}
                  className="border p-2 w-full rounded-md border-gray-200"
                  placeholder="Amount"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                className="border p-2 w-full rounded-md border-gray-200"
                placeholder="Description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block">
                  Type <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <select {...field} className="border p-2 w-full rounded">
                      {Object.values(ExpensesType).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              {type === ExpensesType.PERIODIC && (
                <div className="space-y-1">
                  <label className="block">
                    Frequency <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    control={control}
                    name="frequency"
                    render={({ field }) => (
                      <select {...field} className="border p-2 w-full rounded">
                        {Object.values(ExpenseFrequency).map((freq) => (
                          <option key={freq} value={freq}>
                            {freq}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
              )}

              <div
                className={`space-y-1 ${
                  type === ExpensesType.PERIODIC ? "col-span-2" : ""
                }`}
              >
                <label className="block">
                  {type === ExpensesType.PERIODIC ? `Start Date` : "Date"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("startDate")}
                  className="border p-2 w-full rounded-md border-gray-200"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-4">Payee Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("payee.firstName")}
                  className="border p-2 w-full rounded-md border-gray-200"
                  placeholder="First Name"
                />
              </div>
              <div className="space-y-1">
                <label className="block">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("payee.lastName")}
                  className="border p-2 w-full rounded-md border-gray-200"
                  placeholder="Last Name"
                />
              </div>
              <div className="space-y-1">
                <label className="block">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("payee.phoneNumber")}
                  className="border p-2 w-full rounded-md border-gray-200"
                  placeholder="Phone Number"
                />
              </div>
              <div className="space-y-1">
                <label className="block">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("payee.email")}
                  className="border p-2 w-full rounded-md border-gray-200"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block">
                Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("payee.note")}
                className="border p-2 w-full rounded-md border-gray-200"
                placeholder="Notes about payee"
              />
            </div>

            <h3 className="text-lg font-semibold mt-4">Bank Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("payee.bankName")}
                  className="border p-2 w-full rounded-md border-gray-200"
                  placeholder="Bank Name"
                />
              </div>
              <div className="space-y-1">
                <label className="block">
                  Account Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("payee.accountName")}
                  className="border p-2 w-full rounded-md border-gray-200"
                  placeholder="Account Name"
                />
              </div>
              <div className="space-y-1">
                <label className="block">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("payee.accountNumber")}
                  className="border p-2 w-full rounded-md border-gray-200"
                  placeholder="Account Number"
                />
              </div>
              <div className="space-y-1">
                <label className="block">
                  Bank Code <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("payee.bankCode")}
                  className="border p-2 w-full rounded-md border-gray-200"
                  placeholder="Bank Code"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded w-full font-semibold hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default CreateExpense;
