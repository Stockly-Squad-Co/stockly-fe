'use client';
import SpinLoader from '@/components/Common/Loaders/spin';
import ConfirmationModal from '@/components/Common/Modal/confirmation-modal';
import { Product } from '@/lib/@types';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/ModalProvider';
import { removeProductFromDiscount } from '@/lib/services/discount.service';
import { formatNaira } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React, { FC } from 'react';
import { BiTrash } from 'react-icons/bi';
import { toast } from 'sonner';

interface Props {
  product: Product;
  discount_id: string;
}

const DiscountProduct: FC<Props> = ({ product, discount_id }) => {
  const { showModal } = useModal();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['remove-product-from-discount'],
    mutationFn: () => removeProductFromDiscount(discount_id, product._id),
    onSuccess() {
      toast.success('Removed');
      queryClient.invalidateQueries({
        predicate(query) {
          return (
            query.queryKey.includes('discounts') &&
            query.queryKey.includes(discount_id)
          );
        },
      });
    },
  });

  return (
    <article className="flex items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-3">
        <Image
          src={product.display_image}
          alt="procuct image"
          width={80}
          height={80}
          className="rounded-md object-cover object-center w-[80px] h-[80px]"
        />

        <h2 className="text-[1rem] font-semibold">{product.name}</h2>
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-[1rem] font-semibold">
          {formatNaira(product.price)}
        </h2>

        <span
          className="w-[35px] h-[35px] bg-gray-100 flex items-center justify-center rounded-md cursor-pointer"
          onClick={() => {
            if (!isPending) {
              showModal(
                <ConfirmationModal
                  title="Remove product from discount"
                  subtitle="Are you sure you want to remove this product from this discount?"
                  onYes={mutateAsync}
                />
              );
            }
          }}
        >
          {isPending ? <SpinLoader size={25} /> : <BiTrash size={22} />}
        </span>
      </div>
    </article>
  );
};

export default DiscountProduct;
