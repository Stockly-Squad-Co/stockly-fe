import { Expense } from "@/lib/@types";
import { formatNaira } from "@/lib/utils";
import { cn } from "@/lib/utils/cn";
import { ExpenseStatus } from "@/lib/utils/enums";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { FaRegUser } from "react-icons/fa";

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
        <div className="flex gap-2">
          <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center">
            <FaRegUser />
          </div>
          <div className="text-sm">
            <p className="font-medium">
              {payee.firstName} {payee.lastName}
            </p>
            <div className="text-sm text-gray-500">
              <p className="">{payee.phoneNumber}</p>
              {/* <p className="truncate max-w-sm">{payee.email}</p> */}
            </div>
          </div>
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
