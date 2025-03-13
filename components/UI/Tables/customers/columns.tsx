import { Customer } from '@/lib/@types';
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Actions from './actions';

export const columns: ColumnDef<Customer>[] = [
  {
    header: 'Date Added',
    accessorKey: 'createdAt',
    cell({ row }) {
      return formatDate(row?.original?.createdAt);
    },
  },
  {
    header: 'Name',
    accessorKey: 'name',
    cell({ row }) {
      return (
        <p>
          {row?.original?.firstName} {row?.original?.lastName ?? ''}
        </p>
      );
    },
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
  {
    header: '',
    id: 'actions',
    accessorKey: 'actions',
    cell: ({ row }) => <Actions customer={row?.original} />,
  },
];
