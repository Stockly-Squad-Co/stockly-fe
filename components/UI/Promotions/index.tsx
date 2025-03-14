'use client';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import React from 'react';
import { BiPlus } from 'react-icons/bi';
import PromotionsTable from '../Tables/promotions';
import { useQuery } from '@tanstack/react-query';
import { getDiscounts } from '@/lib/services/discount.service';

const PromotionsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['discounts'],
    queryFn: getDiscounts,
  });

  return (
    <section>
      <header className="flex items-center gap-4 justify-between mb-6">
        <h1 className="text-[1.7rem] font-bold">Promotions</h1>
        <Link href={'/promotions/new'}>
          <Button
            variant="filled"
            size="medium"
            iconPosition="left"
            icon={<BiPlus />}
          >
            Create New Discount
          </Button>
        </Link>
      </header>

      <PromotionsTable data={data} loading={isLoading} />
    </section>
  );
};

export default PromotionsPage;
