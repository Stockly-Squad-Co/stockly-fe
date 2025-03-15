import { RecentOrder } from "@/lib/@types/dashboard.types";
import { formatDate, formatNaira } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<RecentOrder>[] = [
  {
    header: "Order ID",
    accessorKey: "_id",
  },
  {
    header: "Amount",
    accessorKey: "totalAmount",
    cell: ({ row }) => formatNaira(row?.original?.totalAmount),
  },
  {
    header: "Shipping",
    accessorKey: "shippingStatus",
    cell: ({ row }) => {
      const status = row?.original?.shippingStatus;

      return <div className="font-medium text-sm">{status}</div>;
    },
  },
  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => formatDate(row?.original?.orderDate),
  },
];
