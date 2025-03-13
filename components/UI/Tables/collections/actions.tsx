'use client';
import SpinLoader from '@/components/Common/Loaders/spin';
import ConfirmationModal from '@/components/Common/Modal/confirmation-modal';
import { Collections } from '@/lib/@types';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/ModalProvider';
import { deleteCollection } from '@/lib/services/products.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import { toast } from 'sonner';

interface Props {
  collection: Collections;
}

const Actions: FC<Props> = ({ collection }) => {
  const router = useRouter();
  const { showModal } = useModal();

  const { mutateAsync: _deleteCollection, isPending: _deletingCollection } =
    useMutation({
      mutationKey: ['collections', 'delete'],
      mutationFn: () => deleteCollection(collection._id),
      onSuccess() {
        toast.success('Collection deleted successfully');
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
        onClick={() => router.push(`/products/collections/${collection?._id}`)}
      />

      {_deletingCollection ? (
        <SpinLoader size={20} type="small" />
      ) : (
        <BiTrash
          size={22}
          cursor={'pointer'}
          onClick={() =>
            showModal(
              <ConfirmationModal
                title="Delete Collection"
                subtitle="Are you sure you want to delete this collection?"
                onYes={_deleteCollection}
              />
            )
          }
        />
      )}
    </div>
  );
};

export default Actions;
