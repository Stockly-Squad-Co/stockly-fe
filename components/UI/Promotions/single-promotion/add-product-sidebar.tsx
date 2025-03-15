'use client';
import Button from '@/components/Common/Button';
import BackButton from '@/components/Common/Button/back-button';
import SidebarComp from '@/components/Common/Sidebar';
import { Product } from '@/lib/@types';
import { queryClient } from '@/lib/providers';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import {
  addProductToDiscount,
  getDiscountableProducts,
} from '@/lib/services/discount.service';
import { formatNaira } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  discount_id: string;
}

const AddProductSidebar: FC<Props> = ({ discount_id }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const { hideSidebar } = useSidebar();
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'discountable-products'],
    queryFn: getDiscountableProducts,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['add-product-to-discount'],
    mutationFn: () => addProductToDiscount(discount_id, selectedProduct?._id!),
    onSuccess() {
      toast.success('Product added to discount');
      queryClient.invalidateQueries({
        predicate(query) {
          return (
            query.queryKey.includes('discounts') &&
            query.queryKey.includes(discount_id)
          );
        },
      });
      hideSidebar();
    },
  });

  return (
    <SidebarComp onClose={hideSidebar} className="p-5 space-y-2 flex flex-col">
      <BackButton onBack={hideSidebar} />
      <h1 className="text-[1.3rem] font-bold">Select Product</h1>

      <div className="mt-8">
        {isLoading &&
          new Array(5).fill(null).map((_, index) => {
            return (
              <div
                className="w-full h-[80px] rounded-md bg-gray-100 animate-pulse mb-4"
                key={index}
              ></div>
            );
          })}
        {products?.map((product, index) => {
          return (
            <article
              key={index}
              className="flex items-center justify-between p-4 border-b w-full"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="size-4 accent-accent cursor-pointer"
                  checked={product._id === selectedProduct?._id}
                  onChange={() => {
                    if (product._id === selectedProduct?._id) {
                      setSelectedProduct(undefined);
                    } else {
                      setSelectedProduct(product);
                    }
                  }}
                />
                <Image
                  alt="select-product"
                  src={product.display_image}
                  width={1000}
                  height={1000}
                  className="w-[50px] h-[50px] rounded-md object-center object-cover"
                />
                <div>
                  <p className="text-[.95rem]">{product?.name}</p>
                  <p className="text-[.8rem]">
                    {product.quantityAvailable} in stock
                  </p>
                </div>
              </div>

              <p className="justify-self-end text-[1.1rme] font-bold">
                {formatNaira(product.price)}
              </p>
            </article>
          );
        })}
      </div>

      <footer className="min-h-[40px] bg-primary w-full absolute bottom-0 left-0 flex items-center justify-end px-2 py-3 gap-2">
        <Button
          type="button"
          size="small"
          variant="outline"
          className="text-white border-white"
          onClick={hideSidebar}
        >
          Cancel
        </Button>

        <div className="flex items-center gap-2">
          <Button
            className="text-white hover:bg-accent bg-accent"
            variant="filled"
            size="small"
            loading={isPending}
            onClick={() => mutateAsync()}
            disabled={!selectedProduct}
          >
            Add Product
          </Button>
        </div>
      </footer>
    </SidebarComp>
  );
};

export default AddProductSidebar;
