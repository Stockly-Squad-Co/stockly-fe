"use client";
import Button from "@/components/Common/Button";
import { fetchDashboardData } from "@/lib/services/analytics.service";
import useUserStore from "@/lib/store/user.store";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  const { user } = useUserStore();

  if (isLoading)
    return (
      <div className="space-y-10">
        <div className="">
          <div className="w-full h-[10rem] bg-gray-100 animate-pulse rounded-xl"></div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-24 h-8 bg-gray-100 animate-pulse rounded-xl"></div>

            <div className="flex items-center">
              <div className="size-4 bg-gray-100 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="w-full h-[10rem] bg-gray-100 flex-1 animate-pulse rounded-xl"></div>
            <div className="w-full h-[10rem] bg-gray-100 flex-1 animate-pulse rounded-xl"></div>
            <div className="w-full h-[10rem] bg-gray-100 flex-1 animate-pulse rounded-xl"></div>
          </div>
          <div className="flex gap-3">
            <div className="w-full h-[10rem] bg-gray-100 flex-1 animate-pulse rounded-xl"></div>
            <div className="w-full h-[10rem] bg-gray-100 flex-1 animate-pulse rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  if (!data) return <div>No data available</div>;

  const revenueData = data.revenueOverview.length
    ? data.revenueOverview
    : [{ date: "No Data", total: 0 }];
  const topChannels = data.topChannels.length
    ? data.topChannels
    : [{ _id: "No Data", total: 0 }];

  return (
    <main>
      <section>
        <div className="w-full border rounded-md p-5 shadow shadow-gray-200">
          <div className="space-y-5">
            <div>
              <p className="font-semibold text-xl">Complete your onboarding</p>
              <p className="text-sm text-gray-500">
                Complete the next steps to launch your fully automates store.
              </p>
            </div>

            <Button variant="filled" className="px-5">
              Next Step
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 space-y-3">
        {user && (
          <h2 className="text-2xl font-medium capitalize">
            Hello {user.firstName}{" "}
          </h2>
        )}

        <div className="flex gap-3">
          <div className="flex-[2] border rounded-md p-5 shadow shadow-gray-200">
            <div className="flex gap-4 justify-between">
              <div>
                <p className="text-xl font-medium">Overview</p>
                <p className="text-gray-500 text-sm">
                  Your store overall performance and metrics.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="border rounded-md p-5 shadow shadow-gray-200"></div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {/* <div className="bg-white shadow-md rounded-2xl p-4">
  <h2 className="text-xl font-semibold">Revenue Overview</h2>
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={revenueData}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="total" fill="#4F46E5" />
    </BarChart>
  </ResponsiveContainer>
</div>
<div className="bg-white shadow-md rounded-2xl p-4">
  <h2 className="text-xl font-semibold">Top Sales Channels</h2>
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
        data={topChannels}
        dataKey="total"
        nameKey="_id"
        cx="50%"
        cy="50%"
        outerRadius={80}
      >
        {topChannels.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>
<div className="bg-white shadow-md rounded-2xl p-4 col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
  <div>
    <h3 className="text-lg font-semibold">Orders</h3>
    <p className="text-2xl font-bold">{data.orders_count}</p>
  </div>
  <div>
    <h3 className="text-lg font-semibold">Total Sales</h3>
    <p className="text-2xl font-bold">
      ₦{data.total_sales_amount.toLocaleString()}
    </p>
  </div>
  <div>
    <h3 className="text-lg font-semibold">New Customers</h3>
    <p className="text-2xl font-bold">{data.new_customers}</p>
  </div>
  <div>
    <h3 className="text-lg font-semibold">Offline Sales</h3>
    <p className="text-2xl font-bold">{data.offlineSales}</p>
  </div>
</div> */}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
