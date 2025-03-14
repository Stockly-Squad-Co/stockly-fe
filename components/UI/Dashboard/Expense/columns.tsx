import { Expense } from "@/lib/@types";
import { formatNaira } from "@/lib/utils";
import { cn } from "@/lib/utils/cn";
import { ExpenseStatus } from "@/lib/utils/enums";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";

const columns: ColumnDef<Expense>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => formatNaira(row.original.amount),
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => row.original.description || "--.--",
  },
  {
    header: "Frequency",
    accessorKey: "frequency",
    cell: ({ row }) => row.original?.frequency || "--.--",
  },
  {
    header: "User",
    accessorKey: "payee",
    cell: ({ row }) => {
      const { payee } = row.original;

      return (
        <div className="text-sm">
          <p className="font-medium">
            {payee.firstName} {payee.lastName}
          </p>
          <p className="text-gray-500">{payee.phoneNumber}</p>
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <span
          className={cn(`font-semibold`, {
            "text-green-500":
              status === ExpenseStatus.PAID || status === ExpenseStatus.ACTIVE,
            "text-red-500":
              status === ExpenseStatus.DELETED ||
              status === ExpenseStatus.PAYOUT_FAILED,
          })}
        >
          {status}
        </span>
      );
    },
  },
  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) =>
      formatDistanceToNow(row.original.createdAt, { addSuffix: true }),
  },
];

export default columns;
