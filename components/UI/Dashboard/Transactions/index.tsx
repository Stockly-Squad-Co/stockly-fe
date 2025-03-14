"use client";

import TableComponent from "@/components/Common/Table";
import { getTransactions } from "@/lib/services/transaction.service";
import { useQuery } from "@tanstack/react-query";
import columns from "./columns";
import { useSidebar } from "@/lib/providers/SidedrawerProvider";
import TransactionOverviewSidebar from "./transaction-overview";

const Transactions = () => {
  const { data: transactions, isPending: loading } = useQuery({
    queryFn: getTransactions,
    queryKey: ["transactions"],
  });

  const { showSidebar } = useSidebar();

  return (
    <div className="mt-4">
      <TableComponent
        heading={{
          title: "Transactions",
          description: "View all transactions",
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
