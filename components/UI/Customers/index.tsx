'use client';
import Button from '@/components/Common/Button';
import React from 'react';
import { BiPlus } from 'react-icons/bi';
import CustomersTable from '../Tables/customers';
import SmallContentBox from '@/components/Common/Box/small';
import { LuUser } from 'react-icons/lu';
import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '@/lib/services/customer.service';
import Link from 'next/link';

const CustomersPage = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
  });

  return (
    <div className="space-y-8 md:p-6 p-4">
      <header className="flex items-center gap-4 justify-between">
        <h1 className="text-[1.7rem] font-bold">Customers</h1>
        <Link href="/customers/new">
          <Button
            variant="filled"
            size="medium"
            iconPosition="left"
            icon={<BiPlus />}
          >
            Add New Customer
          </Button>
        </Link>
      </header>

      <div className="flex items-center flex-wrap gap-3">
        <SmallContentBox
          boxKey="Total Customers"
          value={data?.meta?.totalCount?.toLocaleString?.()}
          icon={<LuUser />}
          iconColor="#1E40AF"
          boxBg="#1E40AF11"
        />
      </div>

      <CustomersTable data={data?.data} loading={isLoading} />
    </div>
  );
};

export default CustomersPage;
