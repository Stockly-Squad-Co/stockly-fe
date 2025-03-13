'use client';
import SmallContentBox from '@/components/Common/Box/small';
import Button from '@/components/Common/Button';
import { getInventoryOverview } from '@/lib/services/products.service';
import { formatNaira } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { FC } from 'react';
import { BiPlus } from 'react-icons/bi';
import { LuBox, LuTag } from 'react-icons/lu';

interface Props {
  currentTab?: number;
}

const ProductsHeader: FC<Props> = ({ currentTab }) => {
  const { data: overview } = useQuery({
    queryKey: ['products', 'inventory-overview'],
    queryFn: getInventoryOverview,
  });

  return (
    <>
      <header className="flex items-center gap-4 justify-between">
        <h1 className="text-[1.7rem] font-bold">Products</h1>
        <Link href="/products/new">
          <Button
            variant="filled"
            size="medium"
            iconPosition="left"
            icon={<BiPlus />}
          >
            {currentTab === 0 ? 'Add New Product' : 'Create Collection'}
          </Button>
        </Link>
      </header>

      <main className="mt-6">
        <div className="flex items-center gap-4">
          <SmallContentBox
            boxBg="#e0f2fe"
            iconColor="#0369a1"
            icon={'₦'}
            value={formatNaira(overview?.totalInventoryValue || 0)}
            boxKey="Total Inventory Value"
          />

          <SmallContentBox
            boxBg="#fef2f2"
            iconColor="#b91c1c"
            icon={<LuTag />}
            value={overview?.totalSold}
            boxKey="Products Sold"
          />

          <SmallContentBox
            boxBg="#e0f2fe"
            iconColor="#0369a1"
            icon={<LuBox />}
            value={overview?.outOfStock}
            boxKey="Out Of Stock"
          />
        </div>
      </main>
    </>
  );
};

export default ProductsHeader;
