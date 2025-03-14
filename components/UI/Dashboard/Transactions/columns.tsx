import { Transaction } from "@/lib/@types";
import { formatNaira } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Transaction>[] = [
  {
    header: "Ref",
    accessorKey: "transaction_reference",
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => formatNaira(row.original.amount),
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  // {
  //   header: "Payment Method",
  //   accessorKey: "payment_method",
  // },
  {
    header: "Transaction Type",
    accessorKey: "transaction_type",
  },
  {
    header: "Date",
    accessorKey: "createdAt",
  },
];

export default columns;
