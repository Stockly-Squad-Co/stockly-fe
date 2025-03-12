'use client';
import React, { FC } from 'react';
import { Customer } from '@/lib/@types';
import TableComponent from '@/components/Common/Table';
import { columns } from './columns';

interface Props {
  data?: Customer[];
  loading: boolean;
}

const CustomersTable: FC<Props> = ({ data, loading }) => {
  return (
    <TableComponent data={data ?? []} loading={loading} columns={columns} />
  );
};

export default CustomersTable;
