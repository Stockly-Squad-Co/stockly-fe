import Button from '@/components/Common/Button';
import BackButton from '@/components/Common/Button/back-button';
import TextField from '@/components/Common/Inputs/text-field';
import SidebarComp from '@/components/Common/Sidebar';
import { queryClient } from '@/lib/providers';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import { withdraw } from '@/lib/services/payment.service';
import useUserStore from '@/lib/store/user.store';
import { useMutation } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  wallet_balance: number;
}

const WithdrawSidebar: FC<Props> = ({ wallet_balance }) => {
  const [amount, setAmount] = useState(0);
  const { hideSidebar } = useSidebar();
  const { user } = useUserStore();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['wallet', 'withdraw'],
    mutationFn: () => withdraw(amount),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess() {
      toast.success('Withdrawal Processed');
      hideSidebar();
      queryClient.invalidateQueries({
        predicate({ queryKey }) {
          return (
            queryKey.includes('transactions') || queryKey.includes('wallet')
          );
        },
      });
    },
  });

  const onSubmit = async () => {
    if (!amount) {
      return toast.error('Amount is required');
    }
    if (amount > wallet_balance) {
      return toast.error('Insufficient balance');
    }
    await mutateAsync();
  };

  return (
    <SidebarComp onClose={hideSidebar} className="p-5 space-y-4 flex flex-col">
      <BackButton onBack={hideSidebar} />
      <h1 className="text-[1.3rem] font-bold">Withdraw Funds</h1>

      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Account Number"
          disabled={true}
          InputProps={{
            required: true,
            value: user?.store?.bankDetails?.account_number,
          }}
        />
        <TextField
          label="Bank Name"
          disabled={true}
          InputProps={{
            required: true,
            value: user?.store?.bankDetails?.bank_name,
          }}
        />
        <TextField
          label="Account Name"
          className="col-span-2"
          disabled={true}
          InputProps={{
            required: true,
            value: user?.store?.bankDetails?.account_name,
          }}
        />

        <TextField
          label="Amount"
          className="col-span-2"
          InputProps={{
            required: true,
            value: amount,
            onChange: (e) => setAmount(Number(e.target.value) || 0),
          }}
        />

        <div className="col-span-2">
          <Button
            size="medium"
            onClick={onSubmit}
            loading={isPending}
            fullWidth
            variant="filled"
          >
            Withdraw Funds
          </Button>
        </div>
      </div>
    </SidebarComp>
  );
};

export default WithdrawSidebar;
