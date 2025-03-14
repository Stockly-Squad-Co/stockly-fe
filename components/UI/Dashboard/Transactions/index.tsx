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
import WithdrawSidebar from './withdraw-sidebar';
import SmallContentBox from '@/components/Common/Box/small';
import { BiMoney } from 'react-icons/bi';

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

        {!gettingWallet && (
          <Button
            variant="outline"
            size="extra-small"
            className="!border-white !text-white !hover:border-white hover:!text-white ml-auto mt-3"
            onClick={() =>
              showSidebar(
                <WithdrawSidebar wallet_balance={wallet?.balance || 0} />
              )
            }
          >
            Withdraw
          </Button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <SmallContentBox
          boxBg="#e0f2fe"
          iconColor="#0369a1"
          icon={<BiMoney />}
          value={overview?.totalOffline}
          boxKey="Total Offlines"
        />

        <SmallContentBox
          boxBg="#f0fdf4"
          iconColor="#16a34a"
          icon={<BiMoney />}
          value={overview?.totalOnline}
          boxKey="Total Online"
        />

        <SmallContentBox
          boxBg="#fef2f2"
          iconColor="#b91c1c"
          icon={<BiMoney />}
          value={overview?.totalOffline}
          boxKey="Total Offline transactions"
        />

        <SmallContentBox
          boxBg="#fefce8"
          iconColor="#ca8a04"
          icon={<BiMoney />}
          value={overview?.totalPayouts}
          boxKey="Total Payouts"
        />
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
