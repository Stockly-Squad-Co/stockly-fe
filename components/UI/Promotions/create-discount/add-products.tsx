'use client';
import Button from '@/components/Common/Button';
import BackButton from '@/components/Common/Button/back-button';
import SidebarComp from '@/components/Common/Sidebar';
import { Product } from '@/lib/@types';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import { getDiscountableProducts } from '@/lib/services/discount.service';
import { formatNaira } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { FC, useState } from 'react';

interface Props {
  selectedProducts: Product[];
  setProducts: (products: Product[]) => void;
}

const AddProductsSidebar: FC<Props> = ({ selectedProducts, setProducts }) => {
  const [_selectedProducts, setSelectedProducts] =
    useState<Product[]>(selectedProducts);

  const { hideSidebar } = useSidebar();
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'discountable-products'],
    queryFn: getDiscountableProducts,
  });

  const addToProducts = (prod: Product) => {
    setSelectedProducts([..._selectedProducts, prod]);
  };

  const removeFromProducts = (product_id: string) =>
    setSelectedProducts(_selectedProducts.filter((p) => p._id != product_id));

  return (
    <SidebarComp onClose={hideSidebar} className="p-5 space-y-2 flex flex-col">
      <BackButton onBack={hideSidebar} />
      <h1 className="text-[1.3rem] font-bold">Select Products</h1>

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
          const isSelected = !!_selectedProducts.find(
            (p) => p._id === product._id
          );

          return (
            <article
              key={index}
              className="flex items-center justify-between p-4 border-b w-full"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="size-4 accent-accent cursor-pointer"
                  checked={isSelected}
                  onChange={() => {
                    if (isSelected) {
                      removeFromProducts(product._id);
                    } else {
                      addToProducts(product);
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
            onClick={() => (setProducts(_selectedProducts), hideSidebar())}
          >
            Save
          </Button>
        </div>
      </footer>
    </SidebarComp>
  );
};

export default AddProductsSidebar;
