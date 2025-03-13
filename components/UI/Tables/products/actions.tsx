'use client';
import SpinLoader from '@/components/Common/Loaders/spin';
import ConfirmationModal from '@/components/Common/Modal/confirmation-modal';
import { Product } from '@/lib/@types';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/ModalProvider';
import { deleteProduct } from '@/lib/services/products.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import { toast } from 'sonner';

interface Props {
  product: Product;
}

const Actions: FC<Props> = ({ product }) => {
  const router = useRouter();
  const { showModal } = useModal();

  const { mutateAsync: _deleteProduct, isPending: _deletingProduct } =
    useMutation({
      mutationKey: ['products', 'delete'],
      mutationFn: () => deleteProduct(product._id),
      onSuccess() {
        toast.success('Product deleted successfully');
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) =>
            queryKey.includes('products') || queryKey.includes('collections'),
        });
      },
    });

  return (
    <div className="flex items-center w-full justify-center gap-2">
      <FiEye
        size={22}
        cursor={'pointer'}
        onClick={() => router.push(`/products/${product?._id}`)}
      />

      {_deletingProduct ? (
        <SpinLoader size={20} type="small" />
      ) : (
        <BiTrash
          size={22}
          cursor={'pointer'}
          onClick={() =>
            showModal(
              <ConfirmationModal
                title="Delete Product"
                subtitle="Are you sure you want to delete this product?"
                onYes={_deleteProduct}
              />
            )
          }
        />
      )}
    </div>
  );
};

export default Actions;
