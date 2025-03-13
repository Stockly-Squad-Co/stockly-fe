import ProductStatusChip from '@/components/Common/Status/product-status';
import { Product } from '@/lib/@types';
import { formatNaira } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Actions from './actions';

export const columns: ColumnDef<Product>[] = [
  {
    header: '',
    id: 'image',
    accessorKey: 'display_image',
    cell: ({ row }) => {
      return (
        <Image
          src={row?.original?.display_image}
          width={40}
          height={40}
          alt="product_display_image"
          className="w-[40px] h-[40px] rounded-md"
        />
      );
    },
  },
  {
    header: 'Product',
    accessorKey: 'name',
  },
  {
    header: 'Collection',
    accessorKey: 'collection_count',
  },
  {
    header: 'In Stock',
    accessorKey: 'quantityAvailable',
  },
  {
    header: 'Price',
    accessorKey: 'price',
    cell: ({ row }) => {
      return (
        <p className="text-[.9rem]">{formatNaira(row?.original?.price!)}</p>
      );
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      return <ProductStatusChip status={row?.original?.status} />;
    },
  },
  {
    header: '',
    id: 'view',
    accessorKey: 'view',
    cell: ({ row }) => {
      return <Actions product={row?.original} />;
    },
  },
];
