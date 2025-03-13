import OrderStatus from '@/components/Common/Status/order-status';
import { PurchaseHistory } from '@/lib/@types';
import { formatNaira } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<PurchaseHistory>[] = [
  {
    header: 'Order ID & Name',
    accessorKey: 'sku',
    cell({ row }) {
      return (
        <p className="captialize font-semibold">
          #{row?.original?.sku} • {row?.original?.customer_name}
        </p>
      );
    },
  },
  {
    header: 'Total',
    accessorKey: 'totalAmount',
    cell({ row }) {
      return <p>{formatNaira(row?.original?.totalAmount)}</p>;
    },
  },
  {
    header: 'Status',
    accessorKey: 'orderStatus',
    cell({ row }) {
      return <OrderStatus status={row?.original?.orderStatus} />;
    },
  },
];
