'use client';

import SidebarComp from '@/components/Common/Sidebar';
import { Transaction } from '@/lib/@types';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import { formatNaira } from '@/lib/utils';
import { cn } from '@/lib/utils/cn';
import { formatDistanceToNow } from 'date-fns';

const TransactionOverviewSidebar = (transaction: Transaction) => {
  const { hideSidebar } = useSidebar();

  return (
    <SidebarComp onClose={hideSidebar} className="p-5">
      <div className="space-y-6">
        <p className="text-2xl font-semibold">Transaction Overview</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p>Transaction Type:</p>
            <p>{`${transaction.transaction_type}`}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Amount:</p>
            <p>{`${formatNaira(transaction.amount)}`}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Purpose:</p>
            <p>{`${transaction.purpose}`}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Status:</p>
            <p
              className={cn({
                'text-green-500': transaction.status === 'SUCCESSFUL',
                'text-red-500': transaction.status === 'FAILED',
                'text-yellow-500': transaction.status === 'PENDING',
              })}
            >{`${transaction.status}`}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Direction:</p>
            <p>{`${transaction.direction}`}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Date:</p>
            <p>{`${formatDistanceToNow(transaction.createdAt, {
              addSuffix: true,
            })}`}</p>
          </div>
        </div>
      </div>
    </SidebarComp>
  );
};

export default TransactionOverviewSidebar;
