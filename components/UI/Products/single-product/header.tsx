import BackButton from '@/components/Common/Button/back-button';
import { Switch } from '@/components/Common/Shadcn/switch';
import ProductStatusChip from '@/components/Common/Status/product-status';
import { Product } from '@/lib/@types';
import { ProductStatus } from '@/lib/enums';
import { queryClient } from '@/lib/providers';
import { updateProductStatus } from '@/lib/services/products.service';
import { useMutation } from '@tanstack/react-query';
import React, { FC } from 'react';
import { toast } from 'sonner';

interface Props {
  product: Product;
}

const SingleProductHeader: FC<Props> = ({ product }) => {
  const {
    mutateAsync: _updateProductStatus,
    isPending: _updatingProductStatus,
  } = useMutation({
    mutationKey: ['products', 'edit-status', product._id],
    mutationFn: (status: ProductStatus) =>
      updateProductStatus(product._id as string, status),
    onSuccess() {
      queryClient.invalidateQueries({
        predicate({ queryKey }) {
          return (
            queryKey.includes('products') && queryKey.includes(product._id)
          );
        },
      });
      toast.success(`Product visibility udpated successfully`);
    },
  });

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="font-bold text-[1.2rem]">{product?.name}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          checked={product?.status === ProductStatus.PUBLISHED}
          className={_updatingProductStatus ? '!animate-pulse' : ''}
          onCheckedChange={() =>
            _updateProductStatus(
              product?.status === ProductStatus.PUBLISHED
                ? ProductStatus.UNPUBLISHED
                : ProductStatus.PUBLISHED
            )
          }
        />
        <ProductStatusChip status={product?.status!} />
      </div>
    </header>
  );
};

export default SingleProductHeader;
