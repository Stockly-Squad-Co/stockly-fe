import { ProductHistory } from '@/lib/@types';
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ProductHistory>[] = [
  {
    header: 'Date',
    accessorKey: 'createdAt',
    cell: ({ row }) => formatDate(row?.original?.createdAt),
  },
  {
    header: 'Source',
    accessorKey: 'source',
    cell: ({ row }) => <p className="capitalize">{row?.original?.source}</p>,
  },
  {
    header: 'Activity',
    accessorKey: 'activity',
  },
  {
    header: 'Quantity Before',
    accessorKey: 'quantity_before',
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity_effected',
  },
  {
    header: 'Quantity After',
    accessorKey: 'quantity_after',
  },
];
