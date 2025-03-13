import { Collections } from '@/lib/@types';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Actions from './actions';

export const columns: ColumnDef<Collections>[] = [
  {
    header: '',
    id: 'image',
    accessorKey: 'display_image',
    cell: ({ row }) => {
      return (
        <Image
          src={row?.original?.image}
          width={40}
          height={40}
          alt="collection_display_image"
          className="w-[40px] h-[40px] rounded-md"
        />
      );
    },
  },

  {
    header: 'Collection',
    accessorKey: 'name',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Products',
    accessorKey: 'totalProducts',
  },
  {
    header: '',
    id: 'view',
    accessorKey: 'view',
    cell: ({ row }) => {
      return <Actions collection={row?.original} />;
    },
  },
];
