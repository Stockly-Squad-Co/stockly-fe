import TableComponent from '@/components/Common/Table';
import { ProductHistory } from '@/lib/@types';
import React, { FC } from 'react';
import { columns } from './columns';
import SmallContentBox from '@/components/Common/Box/small';
import { LuBox, LuTag } from 'react-icons/lu';

interface Props {
  data?: ProductHistory[];
  loading: boolean;
  overviewData?: {
    sold?: number;
    added?: number;
    removed?: number;
    returned?: number;
  };
}

const ProductHistoryTable: FC<Props> = ({ data, loading, overviewData }) => {
  return (
    <>
      <div className="flex items-center gap-4 my-4">
        <SmallContentBox
          boxBg="#e0f2fe"
          iconColor="#0369a1"
          icon={<LuBox />}
          value={overviewData?.sold}
          boxKey="Sold"
        />

        <SmallContentBox
          boxBg="#f0fdf4"
          iconColor="#16a34a"
          icon={<LuTag />}
          value={overviewData?.added}
          boxKey="Added"
        />

        <SmallContentBox
          boxBg="#fef2f2"
          iconColor="#b91c1c"
          icon={<LuTag />}
          value={overviewData?.removed}
          boxKey="Removed"
        />

        <SmallContentBox
          boxBg="#fefce8"
          iconColor="#ca8a04"
          icon={<LuBox />}
          value={overviewData?.returned}
          boxKey="Returned"
        />
      </div>
      <TableComponent data={data ?? []} loading={loading} columns={columns} />;
    </>
  );
};

export default ProductHistoryTable;
