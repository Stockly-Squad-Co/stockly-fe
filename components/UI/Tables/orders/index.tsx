import TableComponent from '@/components/Common/Table';
import { StoreOrder } from '@/lib/@types';
import React, { FC } from 'react';
import { columns } from './columns';

interface Props {
  data?: StoreOrder[];
  loading: boolean;
}

const OrdersTable: FC<Props> = ({ data, loading }) => {
  return (
    <TableComponent data={data ?? []} loading={loading} columns={columns} />
  );
};

export default OrdersTable;
