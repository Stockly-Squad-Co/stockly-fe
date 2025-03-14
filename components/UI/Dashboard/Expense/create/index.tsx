"use client";

import FormContainer from "@/components/Common/Form/form-container";
import { ExpenseFormValues } from "@/lib/@types";
import { queryClient } from "@/lib/providers";
import { createExpense } from "@/lib/services/expense.service";
import { getBanks, lookupAccount } from "@/lib/services/payment.service";
import { ExpenseFrequency, ExpensesType } from "@/lib/utils/enums";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const formatLabel = (str: string) => str.replace(/([A-Z])/g, " $1").trim();

const CreateExpense = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseFormValues>({
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
  });

  const type = watch("type");
  const bankName = watch("payee.bankName");
  const accountNumber = watch("payee.accountNumber");
  const bankCode = watch("payee.bankCode");

  const { data: banks } = useQuery({
    queryFn: getBanks,
    queryKey: ["banks"],
    staleTime: 3600,
  });

  const {
    data: lookup,
    refetch,
    isPending: lookingUp,
  } = useQuery({
    queryFn: () => lookupAccount({ accountNumber, bankCode }),
    queryKey: ["lookupAccount", accountNumber, bankCode],
    staleTime: 3600,
  });

  useEffect(() => {
    setValue("payee.accountNumber", "");
    setValue("payee.accountName", "");
  }, [bankName]);

  useEffect(() => {
    if (!banks) return;

    const bank = banks.find((b) => b.bank_name === bankName);
    if (!bank) return;

    if (accountNumber.length !== 10) return;
    setValue("payee.bankCode", bank.bank_code);

    refetch();
  }, [accountNumber, bankName, banks]);

  useEffect(() => {
    refetch();
  }, [bankCode]);

  useEffect(() => {
    if (!lookup) return;
    setValue("payee.accountName", lookup.account_name);
    setValue("payee.accountNumber", lookup.account_number);
    setValue("payee.bankName", lookup.bank_name);
  }, [lookup]);

  const { isPending: loading, mutate } = useMutation({
    mutationFn: createExpense,
    mutationKey: ["createExpense"],
  });

  const router = useRouter();

  const onSubmit = (data: ExpenseFormValues) =>
    mutate(data, {
      onSuccess: () => {
        toast.success("Expense created successfully");
        queryClient.invalidateQueries({
          predicate: (q) => q.queryKey.includes("expenses"),
        });
        reset();
        router.push("/expenses");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return (
    <div className="mt-4 space-y-4">
      <FormContainer title="Create Expenses">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="border p-3 w-full rounded-md border-gray-200"
                  placeholder="Expense name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("amount", { required: "Amount is required" })}
                  className="border p-3 w-full rounded-md border-gray-200"
                  placeholder="Amount"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="border p-3 w-full rounded-md border-gray-200 resize-none"
                placeholder="Description"
                rows={3}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm">
                  Type <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="type"
                  rules={{ required: "Type is required" }}
                  render={({ field }) => (
                    <select {...field} className="border p-3 w-full rounded">
                      {Object.values(ExpensesType).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>
              {type === ExpensesType.PERIODIC && (
                <div className="space-y-2">
                  <label className="block text-sm">
                    Frequency <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    control={control}
                    name="frequency"
                    // rules={{ required: "Frequency is required" }}
                    render={({ field }) => (
                      <select {...field} className="border p-3 w-full rounded">
                        {Object.values(ExpenseFrequency).map((freq) => (
                          <option key={freq} value={freq}>
                            {freq}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.frequency && (
                    <p className="text-red-500 text-sm">
                      {errors.frequency.message}
                    </p>
                  )}
                </div>
              )}
              <div
                className={`space-y-2 ${
                  type === ExpensesType.PERIODIC ? "col-span-2" : ""
                }`}
              >
                <label className="block text-sm">
                  {type === ExpensesType.PERIODIC ? "Start Date" : "Date"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("startDate", { required: "Date is required" })}
                  className="border p-3 w-full rounded-md border-gray-200"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-4">Payee Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {["firstName", "lastName", "phoneNumber", "email"].map(
                (field) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm capitalize">
                      {formatLabel(field)}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      // @ts-ignore
                      {...register(`payee.${field}`, {
                        required: `${formatLabel(field)} is required`,
                      })}
                      className="border p-3 w-full rounded-md placeholder:capitalize border-gray-200"
                      placeholder={formatLabel(field)}
                    />
                    {
                      // @ts-ignore
                      errors.payee?.[field] && (
                        <p className="text-red-500 text-sm capitalize">
                          {
                            // @ts-ignore
                            formatLabel(errors.payee[field]?.message || "")
                          }
                        </p>
                      )
                    }
                  </div>
                )
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Notes</label>
              <textarea
                {...register("payee.note")}
                className="border p-2 resize-none w-full rounded-md border-gray-200"
                placeholder="Notes about payee"
                rows={3}
              />
            </div>

            {/* <h3 className="text-lg font-semibold mt-4">Bank Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {["bankName", "accountName", "accountNumber", "bankCode"].map(
                (field) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm capitalize">
                      {field.replace(/([A-Z])/g, " $1").trim()}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      // @ts-ignore
                      {...register(`payee.${field}`, {
                        required: `${field} is required`,
                      })}
                      className="border p-3 w-full rounded-md border-gray-200 placeholder:capitalize"
                      placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                    />

                    {
                      // @ts-ignore
                      errors.payee?.[field] && (
                        <p className="text-red-500 text-sm capitalize">
                          {
                            // @ts-ignore
                            (errors.payee[field]?.message || "")
                              .replace(/([A-Z])/g, " $1")
                              .trim()
                          }
                        </p>
                      )
                    }
                  </div>
                )
              )}
            </div> */}

            <div className="col-span-2 space-y-2 pt-4">
              <p className="font-semibold text-lg">Bank Details</p>

              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 capitalize rounded-lg border text-sm ${
                        errors.payee?.bankName
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      {...register("payee.bankName", {
                        required: true,
                      })}
                    >
                      <option
                        value=""
                        className="text-gray-400"
                        disabled
                        selected
                      >
                        Select a bank
                      </option>
                      {banks?.map((bank) => (
                        <option
                          key={bank.bank_code + bank.bank_name}
                          value={bank.bank_name}
                          className="capitalize"
                        >
                          {bank.bank_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">
                      Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border placeholder:text-sm ${
                        errors.payee?.accountName
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="Account Number"
                      {...register("payee.accountNumber", {
                        required: true,
                        pattern: /^\d{10}$/,
                      })}
                      maxLength={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">
                      Account Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-3 rounded-lg border disabled:bg-gray-200 disabled:text-gray-400 placeholder:text-sm ${
                        errors.payee?.accountName
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder={lookingUp ? "loading..." : `--.--`}
                      {...register("payee.accountName", {
                        required: true,
                      })}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-accent text-black duration-300 hover:bg-accent/90 p-3 rounded w-full font-semibold disabled:opacity-50 disabled:bg-gray-200"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default CreateExpense;
