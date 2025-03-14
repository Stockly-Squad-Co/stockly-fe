"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/services/products.service";
import Skeleton from "@/components/Layout/Skeleton";
import { formatDate, formatNaira } from "@/lib/utils";
import SingleProductHeader from "./header";
import ProductQuantity from "./quantiy";
import ProductHistoryTable from "../../Tables/product-history";

const SingleProductPage = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id as string),
  });

  if (isLoading) return <Skeleton />;

  return (
    <section className="p-4 md:p-6">
      <SingleProductHeader product={product!} />

      <div className="p-4 md:p-8 border rounded-md shadow shadow-gray-100 grid grid-cols-4">
        <article>
          <p className="text-[.8rem] font-semibold text-gray-500">Total Sold</p>

          <h2 className="text-2xl font-semibold mt-1">{product?.totalSold}</h2>
        </article>

        <article>
          <p className="text-[.8rem] font-semibold text-gray-500">
            Total Removed
          </p>

          <h2 className="text-2xl font-semibold mt-1">
            {product?.totalRemoved}
          </h2>
        </article>

        <article>
          <p className="text-[.8rem] font-semibold text-gray-500">
            Total Returned
          </p>

          <h2 className="text-2xl font-semibold mt-1">
            {product?.totalReturned}
          </h2>
        </article>

        <article>
          <p className="text-[.8rem] font-semibold text-gray-500">Price</p>

          <h2 className="text-2xl font-semibold mt-1">
            {formatNaira(product?.price!)}
          </h2>
        </article>
      </div>

      <div className="flex gap-4 mt-5">
        <ProductQuantity product={product!} />

        <div className="rounded-md shadow shadow-gray-200 border bg-white flex-[2]">
          <h2 className="font-semibold text-[1.1rem] bg-gray-50 p-2 text-gray-700">
            Product Details
          </h2>

          <div className="py-4 px-6 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Cost Price</p>
            <p className="font-bold">{formatNaira(product?.costPrice!)}</p>
          </div>

          <div className="py-4 px-6 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Discounted Price</p>
            <p className="font-bold">
              {product?.discountedPrice
                ? formatNaira(product?.discountedPrice!)
                : "--"}
            </p>
          </div>

          <div className="py-4 px-6 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Date Added</p>
            <p className="font-bold">{formatDate(product?.createdAt!)}</p>
          </div>

          <div className="py-4 px-6 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Unit</p>
            <p className="font-bold">
              {product?.unit_value && product.unit_value + " "}
              {product?.unit}
            </p>
          </div>

          <div className="py-4 px-6 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Collections</p>
            <p className="font-bold text-[.85rem]">
              {product?.collections?.map((c) => c.name)?.join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-md shadow shadow-gray-200 border mt-6">
        <h2 className="font-semibold text-[1.1rem] bg-gray-50 p-2 text-gray-700">
          Product History
        </h2>

        <div className="py-4 px-6">
          <ProductHistoryTable
            data={product?.history}
            loading={isLoading}
            overviewData={{
              sold: product?.totalSold,
              added: product?.totalAdded,
              returned: product?.totalReturned,
              removed: product?.totalRemoved,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
