'use client';
import SpinLoader from '@/components/Common/Loaders/spin';
import ConfirmationModal from '@/components/Common/Modal/confirmation-modal';
import { Customer } from '@/lib/@types';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/ModalProvider';
import { deleteCustomer } from '@/lib/services/customer.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import { toast } from 'sonner';

interface Props {
  customer: Customer;
}

const Actions: FC<Props> = ({ customer }) => {
  const router = useRouter();
  const { showModal } = useModal();

  const { mutateAsync: _deleteCustomer, isPending: _deletingCustomer } =
    useMutation({
      mutationKey: ['customers', 'delete'],
      mutationFn: () => deleteCustomer(customer._id),
      onSuccess() {
        toast.success('Customer deleted successfully');
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => queryKey.includes('customers'),
        });
      },
    });

  return (
    <div className="flex items-center w-full justify-center gap-2">
      <FiEye
        size={22}
        cursor={'pointer'}
        onClick={() => router.push(`/customers/${customer?._id}`)}
      />

      {_deletingCustomer ? (
        <SpinLoader size={20} type="small" />
      ) : (
        <BiTrash
          size={22}
          cursor={'pointer'}
          onClick={() =>
            showModal(
              <ConfirmationModal
                title="Delete Customer"
                subtitle="Are you sure you want to delete this customer?"
                onYes={_deleteCustomer}
              />
            )
          }
        />
      )}
    </div>
  );
};

export default Actions;
