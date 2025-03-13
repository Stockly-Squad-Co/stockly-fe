import TableComponent from '@/components/Common/Table';
import { Product } from '@/lib/@types';
import React, { FC } from 'react';
import { columns } from './columns';

interface Props {
  data?: Product[];
  loading: boolean;
}

const ProductsTable: FC<Props> = ({ data, loading }) => {
  return (
    <TableComponent
      data={data ?? []}
      loading={loading}
      columns={columns}
      showSearch={true}
    />
  );
};

export default ProductsTable;
