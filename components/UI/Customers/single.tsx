"use client";

import BackButton from "@/components/Common/Button/back-button";
import Skeleton from "@/components/Layout/Skeleton";
import { getCustomer } from "@/lib/services/customer.service";
import { copyToClipboard, formatDate, formatNaira } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { BiCopy, BiEnvelope, BiPhone } from "react-icons/bi";
import PurchaseHistoryTable from "../Tables/purchase-history";

const SingleCustomerPage = () => {
  const { id } = useParams();
  const { isLoading, data: customer } = useQuery({
    queryKey: ["customers", id!],
    queryFn: () => getCustomer(id as string),
  });

  if (isLoading) return <Skeleton />;

  const fullShippingAddress = `${
    customer?.shipping_address?.street_address ?? " "
  }, ${customer?.shipping_address?.city}, ${
    customer?.shipping_address?.state?.name
  }, Nigeria, ${customer?.shipping_address?.zip_code}`;

  return (
    <section className="p-4 md:p-6">
      <header className="flex items-center gap-2 mb-8">
        <BackButton />
        <h1 className="font-bold text-[1.5rem]">Customer Profile</h1>
      </header>

      <section className="flex items-start gap-4 px-6">
        <div className="space-y-4 flex-[4] w-full">
          <article className={"rounded-lg shadow-md border bg-white"}>
            <header className="border-b py-4 px-6 flex items-center gap-4">
              <Image
                width={500}
                height={500}
                className="w-[80px] h-[80px] rounded-full object-center object-cover"
                src={customer?.profilePicture!}
                alt="customer-logo"
              />

              <div>
                <h1 className="text-[1.1rem] font-bold">
                  {customer?.firstName} {customer?.lastName}
                </h1>
                <p className="text-[.8rem] mt-1">
                  Customer since:{" "}
                  <b className="font-semibold text-secondary">
                    {formatDate(`${customer?.createdAt}`)}
                  </b>
                </p>
              </div>
            </header>

            {customer?.additional_information && (
              <div className="py-4 px-6 border-b">
                <h4 className="text-[.9rem] font-semibold">
                  Additional Description
                </h4>

                <p className="mt-2 text-[.8rem] font-light">
                  {customer?.additional_information}
                </p>
              </div>
            )}

            <div className="py-4 px-6 grid grid-cols-4">
              <article>
                <p className="text-[.8rem] font-semibold text-gray-500">
                  LAST ORDER
                </p>

                <h2 className="text-[1.1rem] font-bold mt-1">
                  {customer?.lastOrderDate
                    ? formatDate(customer?.lastOrderDate!)
                    : "No orders yet"}
                </h2>
              </article>

              <article>
                <p className="text-[.8rem] font-semibold text-gray-500">
                  TOTAL AMOUNT SPENT
                </p>

                <h2 className="text-[1.1rem] font-bold mt-1">
                  {formatNaira(customer?.totalAmountSpent!)}
                </h2>
              </article>

              <article>
                <p className="text-[.8rem] font-semibold text-gray-500">
                  TOTAL ORDERS
                </p>

                <h2 className="text-[1.1rem] font-bold mt-1">
                  {customer?.totalOrders}
                </h2>
              </article>

              <article>
                <p className="text-[.8rem] font-semibold text-gray-500">
                  TOTAL ORDERS VALUE
                </p>

                <h2 className="text-[1.1rem] font-bold mt-1">
                  {formatNaira(customer?.totalAmountSpent!)}
                </h2>
              </article>
            </div>
          </article>

          <article className={"rounded-md shadow-md border"}>
            <header className="border-b py-4 px-6 flex items-center gap-4">
              <h1 className="text-[1.1rem] font-bold text-gray-600">
                Purchase History
              </h1>
            </header>

            <div className="py-4 px-6">
              <PurchaseHistoryTable
                loading={isLoading}
                data={customer?.purchase_history}
              />
            </div>
          </article>
        </div>

        <div className="space-y-4 flex-[2]">
          <article className={"rounded-lg shadow-md border bg-white"}>
            <header className="border-b py-4 px-6 flex items-center gap-4">
              <h1 className="text-[1.1rem] font-bold text-gray-600">
                Contact Details
              </h1>
            </header>

            <div className="py-4 px-6 border-b space-y-3">
              {customer?.email && (
                <div className="flex items-center gap-2">
                  <span className="w-[30px] h-[30px] bg-gray-100 text-gray-800 p-2 shadow-sm grid place-content-center rounded-md">
                    <BiEnvelope size={20} />
                  </span>
                  <a
                    href={`mailto:${customer?.email}`}
                    className="text-[.85rem]"
                  >
                    {customer?.email}
                  </a>
                </div>
              )}

              {customer?.phoneNumber && (
                <div className="flex items-center gap-2">
                  <span className="w-[30px] h-[30px] bg-gray-100 text-gray-800 p-2 shadow-sm grid place-content-center rounded-md">
                    <BiPhone size={20} />
                  </span>
                  <a
                    href={`tel:${customer?.phoneNumber}`}
                    className="text-[.85rem]"
                  >
                    {customer?.phoneNumber}
                  </a>
                </div>
              )}
            </div>
          </article>

          <article className={"rounded-lg shadow-md border bg-white"}>
            <header className="border-b py-4 px-6 flex items-center gap-4">
              <h1 className="text-[1.1rem] font-bold text-gray-600">Address</h1>
            </header>

            <div className="py-4 px-6 border-b space-y-3">
              <article>
                <p className="text-[.9rem] font-semibold text-gray-500 flex items-center gap-2">
                  Shippping Address
                  <BiCopy
                    cursor={"pointer"}
                    onClick={() => copyToClipboard(fullShippingAddress)}
                  />
                </p>

                <h2 className="text-[.8rem] font-light mt-1">
                  {fullShippingAddress}
                </h2>
              </article>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
};

export default SingleCustomerPage;
