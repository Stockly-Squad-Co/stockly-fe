import { ProductStatus } from '@/lib/enums';
import { cn } from '@/lib/utils/cn';
import React, { FC } from 'react';

interface Props {
  status: ProductStatus;
}

const ProductStatusChip: FC<Props> = ({ status }) => {
  return (
    <span
      className={cn(
        'text-[.75rem] px-2 py-1 rounded-md capitalize font-semibold',
        status === ProductStatus.PUBLISHED && 'text-blue-700 bg-blue-50',
        status === ProductStatus.UNPUBLISHED && 'text-red-700 bg-red-50'
      )}
    >
      {status}
    </span>
  );
};

export default ProductStatusChip;
