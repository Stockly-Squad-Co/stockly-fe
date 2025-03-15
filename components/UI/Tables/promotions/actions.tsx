'use client';
import SpinLoader from '@/components/Common/Loaders/spin';
import ConfirmationModal from '@/components/Common/Modal/confirmation-modal';
import { Discount } from '@/lib/@types';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/ModalProvider';
import { deleteDiscount } from '@/lib/services/discount.service';
import { useMutation } from '@tanstack/react-query';
import React, { FC } from 'react';
import { BiTrash } from 'react-icons/bi';
import { toast } from 'sonner';

interface Props {
  discount: Discount;
}

const Actions: FC<Props> = ({ discount }) => {
  const { showModal } = useModal();
  const { isPending: _deletingDiscount, mutateAsync: _deleteDiscount } =
    useMutation({
      mutationKey: ['delete-discount', discount._id],
      mutationFn: () => deleteDiscount(discount._id),
      onSuccess() {
        toast.success('Discount deleted successfully');
        queryClient.invalidateQueries({
          predicate(query) {
            return query?.queryKey?.includes('discounts');
          },
        });
      },
      onError(error) {
        toast.error(error.message);
      },
    });

  return (
    <span
      className="w-[35px] h-[35px] bg-gray-100 flex items-center justify-center rounded-md cursor-pointer"
      onClick={() => {
        if (!_deletingDiscount) {
          showModal(
            <ConfirmationModal
              title="Delete Discount"
              subtitle="Are you sure you want to delete this discount?"
              onYes={_deleteDiscount}
            />
          );
        }
      }}
    >
      {_deletingDiscount ? <SpinLoader size={25} /> : <BiTrash size={22} />}
    </span>
  );
};

export default Actions;
