'use client';

import BackButton from '@/components/Common/Button/back-button';
import Skeleton from '@/components/Layout/Skeleton';
import { getDiscount } from '@/lib/services/discount.service';
import { formatDate, formatNaira } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import DiscountProduct from './discount-product';
import DiscountStatusChip from '@/components/Common/Status/discount-status';
import Button from '@/components/Common/Button';
import { BiPlus } from 'react-icons/bi';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import AddProductSidebar from './add-product-sidebar';

const SinglePromotionPage = () => {
  const { showSidebar } = useSidebar();
  const { id } = useParams();

  const { data: discount, isLoading } = useQuery({
    queryKey: ['discounts', id],
    queryFn: () => getDiscount(id as string),
  });

  if (isLoading) return <Skeleton />;

  return (
    <section className="p-4 md:p-6">
      <header className="flex items-center justify-between gap-2 mb-8">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="font-bold text-[1.5rem]">Discount Details</h1>
        </div>

        <Button
          variant="outline"
          size="small"
          iconPosition="left"
          icon={<BiPlus />}
          onClick={() =>
            showSidebar(<AddProductSidebar discount_id={discount?._id!} />)
          }
        >
          Add Item
        </Button>
      </header>

      <div className="flex items-start gap-4">
        <div className="flex-[4] rounded-md shadow-md bg-white">
          <h2 className="font-semibold text-[1.1rem] bg-gray-50 p-2 text-gray-700">
            Discounted Products
          </h2>
          <div>
            {discount?.products?.map((p, index) => {
              return (
                <DiscountProduct
                  discount_id={discount._id}
                  product={p}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <div className="flex-[3] rounded-md shadow-md bg-white">
          <h2 className="font-semibold text-[1.1rem] bg-gray-50 p-2 text-gray-700">
            Discount Details
          </h2>

          <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Description</p>
            <p className="font-bold">{discount?.name}</p>
          </div>

          <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Discount Type</p>
            <p className="font-bold">
              {discount?.type === 'FIXED'
                ? 'Fixed (₦) Discount'
                : 'Percentage (%) Discount'}
            </p>
          </div>

          <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Discount</p>
            <p className="font-bold">
              {discount?.type === 'FIXED'
                ? formatNaira(discount?.value)
                : `${discount?.value}%`}
            </p>
          </div>

          <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Discount Products</p>
            <p className="font-bold">{discount?.products?.length}</p>
          </div>

          <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Discount Status</p>
            <DiscountStatusChip status={discount?.status!} />
          </div>

          <div className="px-6 py-4 border-b flex items-center justify-between text-[.9rem]">
            <p className="text-gray-600">Discount Validity</p>
            <p className="font-bold">
              {formatDate(discount?.startDate!)} -{' '}
              {formatDate(discount?.endDate!)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePromotionPage;
