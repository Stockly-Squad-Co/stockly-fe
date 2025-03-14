'use client';
import { Product } from '@/lib/@types';
import { useModal } from '@/lib/providers/ModalProvider';
import React, { FC } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import ModifyQuantityModal from '../modals/modify-quantity-modal';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface Props {
  product: Product;
}

const ProductQuantity: FC<Props> = ({ product }) => {
  const { showModal } = useModal();

  return (
    <div className="border rounded-md shadow-md p-6 flex-[4] w-full">
      <section className="p-4 bg-gray-100 flex items-center justify-between rounded-md">
        <h2 className="font-semibold text-[.9rem]">Quantity</h2>

        <div className="flex items-center gap-2">
          <span className="w-[35px] h-[35px] grid place-content-center p-2 rounded-md bg-white cursor-pointer">
            <BiMinus
              size={20}
              onClick={() =>
                showModal(
                  <ModifyQuantityModal product={product} type="decrease" />
                )
              }
            />
          </span>

          <p className="text-[1.1rem] font-bold">
            {product?.quantityAvailable}
          </p>

          <span
            className="w-[35px] h-[35px] grid place-content-center p-2 rounded-md bg-white cursor-pointer"
            onClick={() =>
              showModal(
                <ModifyQuantityModal product={product} type="increase" />
              )
            }
          >
            <BiPlus size={20} />
          </span>
        </div>
      </section>

      <h2 className="text-[.9rem] font-semibold mt-2">Product Images</h2>
      <div className="grid grid-cols-4 gap-4 mt-2">
        {product?.images?.map((img, index) => {
          return (
            <div
              key={index}
              className="relative rounded-md cursor-pointer w-full min-h-[120px]"
            >
              <Image
                key={index}
                src={img}
                width={150}
                height={100}
                alt="product-image"
                className={cn(
                  'rounded-xl border-4 border-transparent transition-all duration-200 hover:border-secondary w-full h-[120px] object-center object-cover',
                  img === product.display_image && 'border-secondary'
                )}
              />

              {img === product.display_image && (
                <div className="absolute top-0 left-0 w-full h-full bg-black/30 grid place-content-center text-white text-[.9rem] font-bold">
                  <p>Thumbnail</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductQuantity;
