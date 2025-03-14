'use client';

import TableComponent from '@/components/Common/Table';
import {
  getTransactions,
  getTransactionsOverview,
  getWallet,
} from '@/lib/services/transaction.service';
import { useQuery } from '@tanstack/react-query';
import columns from './columns';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import TransactionOverviewSidebar from './transaction-overview';
import { formatNaira } from '@/lib/utils';
import Button from '@/components/Common/Button';

const Transactions = () => {
  const { data: transactions, isPending: loading } = useQuery({
    queryFn: getTransactions,
    queryKey: ['transactions'],
  });

  const { data: overview, isPending: overviewLoading } = useQuery({
    queryFn: getTransactionsOverview,
    queryKey: ['transactions', 'overview'],
  });

  const { data: wallet, isPending: gettingWallet } = useQuery({
    queryFn: getWallet,
    queryKey: ['wallet'],
  });

  const { showSidebar } = useSidebar();

  return (
    <div className="mt-4 space-y-4">
      <div className="bg-primary text-white rounded-md p-6 shadow-md max-w-fit min-w-[250px]">
        <p className="text-[1rem] font-bold">Digital Wallet</p>
        <p className="text-[2rem] font-bold">
          {formatNaira(wallet?.balance ?? 0)}
        </p>

        <Button
          variant="outline"
          size="extra-small"
          className="!border-white !text-white !hover:border-white hover:!text-white ml-auto mt-3"
        >
          Withdraw
        </Button>
      </div>

      <TableComponent
        heading={{
          title: 'Transactions',
          description: 'View all transactions',
        }}
        columns={columns}
        data={transactions || []}
        loading={loading}
        rowOnClick={(row) =>
          showSidebar(<TransactionOverviewSidebar {...row} />)
        }
      />
    </div>
  );
};

export default Transactions;
