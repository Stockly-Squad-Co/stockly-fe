"use client";

import BackButton from "@/components/Common/Button/back-button";
import { useParams } from "next/navigation";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getProduct,
  updateProductStatus,
} from "@/lib/services/products.service";
import Skeleton from "@/components/Layout/Skeleton";
import ProductStatusChip from "@/components/Common/Status/product-status";
import { Switch } from "@/components/Common/Shadcn/switch";
import { ProductStatus } from "@/lib/enums";
import { toast } from "sonner";
import { queryClient } from "@/lib/providers";
import { formatNaira } from "@/lib/utils";

const SingleProductPage = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id as string),
  });

  const {
    mutateAsync: _updateProductStatus,
    isPending: _updatingProductStatus,
  } = useMutation({
    mutationKey: ["products", "edit-status", id],
    mutationFn: (status: ProductStatus) =>
      updateProductStatus(id as string, status),
    onSuccess() {
      queryClient.invalidateQueries({
        predicate({ queryKey }) {
          return queryKey.includes("products") && queryKey.includes(id);
        },
      });
      toast.success(`Product visibility updated successfully`);
    },
  });

  if (isLoading) return <Skeleton />;

  return (
    <section className="p-4 md:p-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="font-bold text-[1.2rem]">{product?.name}</h1>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={product?.status === ProductStatus.PUBLISHED}
            className={_updatingProductStatus ? "!animate-pulse" : ""}
            onCheckedChange={() =>
              _updateProductStatus(
                product?.status === ProductStatus.PUBLISHED
                  ? ProductStatus.UNPUBLISHED
                  : ProductStatus.PUBLISHED
              )
            }
          />
          <ProductStatusChip status={product?.status!} />
        </div>
      </header>

      <div className="p-6 rounded-md grid grid-cols-4 border shadow-md">
        <article>
          <p className="text-[.8rem] font-semibold text-gray-500">Total Sold</p>

          <h2 className="text-[1.1rem] font-bold mt-1">{product?.totalSold}</h2>
        </article>

        <article>
          <p className="text-[.8rem] font-semibold text-gray-500">
            Total Removed
          </p>

          <h2 className="text-[1.1rem] font-bold mt-1">
            {product?.totalRemoved}
          </h2>
        </article>

        <article>
          <p className="text-[.8rem] font-semibold text-gray-500">
            Total Returned
          </p>

          <h2 className="text-[1.1rem font-bold mt-1">
            {product?.totalReturned}
          </h2>
        </article>

        <article>
          <p className="text-[.8rem] font-semibold text-gray-500">Price</p>

          <h2 className="text-[1.1rem] font-bold mt-1">
            {formatNaira(product?.price!)}
          </h2>
        </article>
      </div>
    </section>
  );
};

export default SingleProductPage;
