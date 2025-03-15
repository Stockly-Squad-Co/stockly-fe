import DiscountStatusChip from '@/components/Common/Status/discount-status';
import { Discount } from '@/lib/@types';
import { formatDate, formatNaira } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Actions from './actions';

export const columns: ColumnDef<Discount>[] = [
  {
    header: 'Date Created',
    accessorKey: 'createdAt',
    cell: ({ row }) => formatDate(row?.original?.createdAt),
  },
  {
    header: 'Description',
    accessorKey: 'name',
  },
  {
    header: 'Discount Type',
    accessorKey: 'type',
    cell: ({ row }) =>
      row?.original?.type === 'FIXED'
        ? 'Fixed Discount'
        : 'Percentage Discount',
  },
  {
    header: 'Discount',
    accessorKey: 'value',
    cell: ({ row }) =>
      row?.original?.type === 'FIXED'
        ? formatNaira(row?.original?.value)
        : `${row?.original?.value}%`,
  },
  {
    header: 'Products',
    accessorKey: 'totalProducts',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => <DiscountStatusChip status={row?.original?.status} />,
  },
  {
    header: '',
    id: 'actions',
    accessorKey: 'actions',
    cell: ({ row }) => <Actions discount={row?.original} />,
  },
];
