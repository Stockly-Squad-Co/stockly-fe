import OrderStatusChip from '@/components/Common/Status/order-status';
import ShippingStatusChip from '@/components/Common/Status/shipping-status';
import { RecentOrder } from '@/lib/@types/dashboard.types';
import { ShippingStatus } from '@/lib/enums';
import { formatDate, formatNaira } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<RecentOrder>[] = [
  {
    header: 'Order ID',
    accessorKey: '_id',
  },
  {
    header: 'Amount',
    accessorKey: 'totalAmount',
    cell: ({ row }) => formatNaira(row?.original?.totalAmount),
  },
  {
    header: 'Shipping',
    accessorKey: 'shippingStatus',
    cell: ({ row }) => {
      const status = row?.original?.shippingStatus as ShippingStatus;

      return (
        <ShippingStatusChip
          status={status ?? ShippingStatus.AWAITING_SHIPPING}
        />
      );
    },
  },
  {
    header: 'Date',
    accessorKey: 'createdAt',
    cell: ({ row }) => formatDate(row?.original?.orderDate),
  },
];
