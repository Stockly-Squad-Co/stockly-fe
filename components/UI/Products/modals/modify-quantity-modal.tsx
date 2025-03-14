'use client';
import Button from '@/components/Common/Button';
import TextField from '@/components/Common/Inputs/text-field';
import Modal from '@/components/Common/Modal';
import { Product } from '@/lib/@types';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/ModalProvider';
import { modifyProductQuantity } from '@/lib/services/products.service';
import { useMutation } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { toast } from 'sonner';

interface Props {
  product: Product;
  type: 'increase' | 'decrease';
}

const ModifyQuantityModal: FC<Props> = ({ product, type }) => {
  const [qty, setQty] = useState<number>(0);
  const { hideModal } = useModal();

  const { mutateAsync: modifyQuantity, isPending: modifyingQuantity } =
    useMutation({
      mutationKey: ['products', 'update-qty', product._id],
      mutationFn: () => modifyProductQuantity({ id: product._id, qty, type }),
      onSuccess() {
        toast.success('Quantity modified successfully');
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) =>
            queryKey.includes('products') && queryKey.includes(product._id),
        });
        hideModal();
      },
    });

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <section className="w-[95vw] max-w-[500px] bg-white p-6 space-y-4 rounded-md">
        <header className="flex items-center gap-4 justify-between">
          <h1 className="text-[1.5rem] font-bold">
            {type === 'increase' ? 'Add' : 'Remove'} Item
          </h1>

          <MdClose size={20} onClick={hideModal} cursor={'pointer'} />
        </header>

        <form
          onSubmit={(e) => (e.preventDefault(), modifyQuantity?.())}
          className="my-6"
        >
          <TextField
            InputProps={{
              disabled: modifyingQuantity,
              required: true,
              type: 'tel',
              placeholder: 'How many?',
              value: qty,
              onChange: (e) => setQty(Number(e.target.value)),
            }}
          />

          <Button
            variant="filled"
            loading={modifyingQuantity}
            fullWidth
            size="medium"
            className="mt-5"
          >
            Save
          </Button>
        </form>
      </section>
    </Modal>
  );
};

export default ModifyQuantityModal;
