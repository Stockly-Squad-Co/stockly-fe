import TableComponent from '@/components/Common/Table';
import { PurchaseHistory } from '@/lib/@types';
import React, { FC } from 'react';
import { columns } from './columns';

interface Props {
  data?: PurchaseHistory[];
  loading: boolean;
}

const PurchaseHistoryTable: FC<Props> = ({ data, loading }) => {
  return (
    <TableComponent data={data ?? []} loading={loading} columns={columns} />
  );
};

export default PurchaseHistoryTable;
