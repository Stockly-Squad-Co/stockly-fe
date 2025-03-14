import OrderPaymentStatusChip from '@/components/Common/Status/order-payment-status';
import OrderStatusChip from '@/components/Common/Status/order-status';
import ShippingStatusChip from '@/components/Common/Status/shipping-status';
import { StoreOrder } from '@/lib/@types';
import { formatDate, formatNaira } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<StoreOrder>[] = [
  {
    header: 'Order ID & Name',
    accessorKey: 'sku',
    cell: ({ row }) => (
      <p className="font-bold text-black capitalize">
        {row?.original?.sku} •{' '}
        {row?.original?.customer
          ? `${row?.original?.customer?.firstName} ${row?.original?.customer?.lastName}`
          : `${row?.original?.metaCustomer?.firstName} ${row?.original?.metaCustomer?.lastName}`}
      </p>
    ),
  },
  {
    header: 'Total',
    accessorKey: 'totalAmount',
    cell: ({ row }) => formatNaira(row?.original?.totalAmount),
  },
  {
    header: 'Status',
    accessorKey: 'orderStatus',
    cell: ({ row }) => <OrderStatusChip status={row?.original?.orderStatus} />,
  },
  {
    header: 'Payment',
    accessorKey: 'paymentStatus',
    cell: ({ row }) => (
      <OrderPaymentStatusChip status={row?.original?.paymentStatus} />
    ),
  },
  {
    header: 'Shipping',
    accessorKey: 'shippingStatus',
    cell: ({ row }) => (
      <ShippingStatusChip status={row?.original?.shippingStatus} />
    ),
  },
  {
    header: 'Date',
    accessorKey: 'createdAt',
    cell: ({ row }) => formatDate(row?.original?.createdAt),
  },
];
