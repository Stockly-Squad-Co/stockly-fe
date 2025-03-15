"use client";

import TableComponent from "@/components/Common/Table";
import React, { FC } from "react";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { RecentOrder } from "@/lib/@types/dashboard.types";

interface Props {
  data?: RecentOrder[];
  loading: boolean;
}

const RecentOrdersTable: FC<Props> = ({ data, loading }) => {
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

export default RecentOrdersTable;
