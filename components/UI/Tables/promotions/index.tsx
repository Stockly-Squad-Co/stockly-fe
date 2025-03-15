'use client';
import TableComponent from '@/components/Common/Table';
import { Discount } from '@/lib/@types';
import React, { FC } from 'react';
import { columns } from './columns';
import { useRouter } from 'next/navigation';

interface Props {
  data?: Discount[];
  loading: boolean;
}

const PromotionsTable: FC<Props> = ({ data, loading }) => {
  const router = useRouter();

  return (
    <TableComponent
      rowOnClick={(row) => router.push(`/promotions/${row?._id}`)}
      data={data ?? []}
      loading={loading}
      columns={columns}
    />
  );
};

export default PromotionsTable;
