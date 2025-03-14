import Button from '@/components/Common/Button';
import SelectField from '@/components/Common/Inputs/select-field';
import TextField from '@/components/Common/Inputs/text-field';
import Modal from '@/components/Common/Modal';
import { Order, StoreOrder } from '@/lib/@types';
import { PaymentMethod } from '@/lib/enums';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/ModalProvider';
import { updatePaymentStatus } from '@/lib/services/order.service';
import { useMutation } from '@tanstack/react-query';
import React, { FC, FormEvent, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { toast } from 'sonner';

interface Props {
  order: StoreOrder;
}

const RecordPaymentModal: FC<Props> = ({ order }) => {
  const [paymentMethod, setPaymentMethod] = useState<
    PaymentMethod | undefined
  >();

  const { hideModal } = useModal();

  const { isPending: updatingPaymentStatus, mutateAsync } = useMutation({
    mutationKey: ['record-payment'],
    mutationFn: () => updatePaymentStatus(order._id, paymentMethod!),
    onSuccess() {
      toast.success('Payment recorded successfully');
      queryClient.invalidateQueries({
        predicate(query) {
          return (
            query.queryKey.includes('orders') &&
            query.queryKey.includes(order._id)
          );
        },
      });
      hideModal();
    },
    onError(error) {
      toast.error(error?.message);
    },
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    mutateAsync();
  };

  return (
    <Modal
      isOpen
      onClose={hideModal}
      className="w-[90vw] max-w-[500px] bg-white p-6 rounded-md"
    >
      <header className="flex items-center justify-end">
        <span className="cursor-pointer">
          <MdClose size={24} onClick={hideModal} />
        </span>
      </header>

      <form onSubmit={onSubmit} className="mt-3 space-y-4">
        <SelectField
          options={[
            PaymentMethod.CASH,
            PaymentMethod.BANK_TRANSFER,
            PaymentMethod.POS,
          ].map((pm) => ({
            label: pm,
            value: pm,
          }))}
          data={{
            label: paymentMethod,
            value: paymentMethod!,
          }}
          onValueChange={(pm) => setPaymentMethod(pm)}
          label="Payment Method"
        />

        <TextField
          disabled={true}
          label="Amount"
          InputProps={{
            value: order?.totalAmount,
            type: 'number',
          }}
        />

        <Button variant="filled" loading={updatingPaymentStatus} fullWidth>
          Update Payment Record
        </Button>
      </form>
    </Modal>
  );
};

export default RecordPaymentModal;
