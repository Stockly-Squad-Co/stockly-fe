"use client";

import TableComponent from "@/components/Common/Table";
import { useQuery } from "@tanstack/react-query";
import columns from "./columns";
import { useSidebar } from "@/lib/providers/SidedrawerProvider";
import { getExpenses } from "@/lib/services/expense.service";
import Button from "@/components/Common/Button";
import { FaPlus } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { useRouter } from "next/navigation";

const Expenses = () => {
  const { data: expenses, isPending: loading } = useQuery({
    queryFn: getExpenses,
    queryKey: ["expenses"],
  });

  const { showSidebar } = useSidebar();
  const router = useRouter();

  return (
    <div className="mt-4 space-y-4">
      <header className="flex items-center gap-4 justify-between">
        <h2 className="text-[1.5rem] max-md:text-[1.1rem] font-bold">
          Expenses
        </h2>

        <div className="flex items-center gap-2">
          <Button icon={<HiUpload />} className="px-5">
            Export as CSV
          </Button>
          <Button
            variant="accent"
            icon={<FaPlus />}
            className="px-5"
            onClick={() => router.push("/expenses/create")}
          >
            Create
          </Button>
        </div>
      </header>

      <TableComponent
        columns={columns}
        data={expenses || []}
        loading={loading}
      />
    </div>
  );
};

export default Expenses;
