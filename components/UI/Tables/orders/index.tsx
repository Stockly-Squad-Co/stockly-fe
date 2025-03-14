'use client';

import TableComponent from '@/components/Common/Table';
import { StoreOrder } from '@/lib/@types';
import React, { FC } from 'react';
import { columns } from './columns';
import { useRouter } from 'next/navigation';

interface Props {
  data?: StoreOrder[];
  loading: boolean;
}

const OrdersTable: FC<Props> = ({ data, loading }) => {
  const { push } = useRouter();
  return (
    <TableComponent
      rowOnClick={(row) => push(`/orders/${row?._id}`)}
      data={data ?? []}
      loading={loading}
      columns={columns}
    />
  );
};

export default OrdersTable;
