import TableComponent from '@/components/Common/Table';
import { Collections } from '@/lib/@types';
import React, { FC } from 'react';
import { columns } from './columns';

interface Props {
  data?: Collections[];
  loading: boolean;
}

const CollectionsTable: FC<Props> = ({ data, loading }) => {
  return (
    <TableComponent
      data={data ?? []}
      loading={loading}
      columns={columns}
      showSearch={true}
    />
  );
};

export default CollectionsTable;
