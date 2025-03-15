'use client';
import SmallContentBox from '@/components/Common/Box/small';
import Button from '@/components/Common/Button';
import { fetchDashboardData } from '@/lib/services/analytics.service';
import useUserStore from '@/lib/store/user.store';
import { useQuery } from '@tanstack/react-query';
import { CiMoneyBill } from 'react-icons/ci';
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
  TooltipProps,
} from 'recharts';
import { RiSignalWifiOffLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import RecentOrdersTable from '../Tables/orders/recent-orders';
import { TbCurrencyNaira, TbWorldWww } from 'react-icons/tb';
import { formatNaira } from '@/lib/utils';
import { GiArcheryTarget, GiTakeMyMoney } from 'react-icons/gi';
import { BiDonateHeart } from 'react-icons/bi';
import { PiUsersFour } from 'react-icons/pi';
import { quickActions } from '@/lib/data';
import Link from 'next/link';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  });

  const { user } = useUserStore();

  const router = useRouter();

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
    : [{ date: 'No Data', total: 0 }];
  const topChannels = data.topChannels.length
    ? data.topChannels
    : [{ _id: 'No Data', total: 0 }];

  return (
    <main>
      {/* <section>
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
      </section> */}

      <section className="space-y-3">
        {user && (
          <h2 className="text-2xl font-bold capitalize">
            Hello {user.firstName}{' '}
          </h2>
        )}

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-4">
            <div className="border rounded-md p-4 space-y-4 shadow shadow-gray-200">
              <div className="flex gap-4 justify-between">
                <div>
                  <p className="text-xl font-medium">Business Overview</p>
                  <p className="text-gray-500 text-sm">
                    Your store overall performance and metrics.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <SmallContentBox
                  boxBg="#e0f2fe"
                  iconColor="#0369a1"
                  icon={'₦'}
                  value={data.orders_count}
                  boxKey="Orders"
                />

                <SmallContentBox
                  boxBg="#fef2f2"
                  iconColor="#b91c1c"
                  icon={<CiMoneyBill />}
                  value={data.total_products_sold.toLocaleString()}
                  boxKey="Products Sold"
                />

                <SmallContentBox
                  boxBg="#ffe10320"
                  iconColor="#ffe103"
                  icon={<PiUsersFour />}
                  value={data?.new_customers.toLocaleString()}
                  boxKey="New Customers"
                />

                <SmallContentBox
                  boxBg="#f0fff3"
                  iconColor="#154d22"
                  icon={<TbWorldWww />}
                  value={data?.websites_visits_count.toLocaleString()}
                  boxKey="Website Visits"
                />
              </div>

              <div className="flex items-center text-gray-400 justify-between gap-8 py-4">
                <div className="h-[1px] bg-gray-200 flex-grow"></div>

                <p className="tracking-[.3em] text-xs">OVERVIEW</p>

                <div className="h-[1px] bg-gray-200 flex-grow"></div>
              </div>

              <div className="grid grid-cols-5 gap-8">
                <div className="space-y-2">
                  <div className="size-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                    <TbCurrencyNaira size={22} />
                  </div>

                  <p className="text-xs font-semibold text-gray-400">
                    Total Sales
                  </p>

                  <p className="text-lg font-medium">
                    {formatNaira(data.total_sales_amount || 0)}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="size-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                    <GiArcheryTarget size={22} />
                  </div>

                  <p className="text-xs font-semibold text-gray-400">
                    Offline Sales
                  </p>

                  <p className="text-lg font-medium">{data.offlineSales}</p>
                </div>

                <div className="space-y-2">
                  <div className="size-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                    <BiDonateHeart size={22} />
                  </div>

                  <p className="text-xs font-semibold text-gray-400">
                    Total Settled
                  </p>

                  <p className="text-lg font-medium">
                    {formatNaira(data.totalSettled || 0)}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="size-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                    <GiTakeMyMoney size={22} />
                  </div>

                  <p className="text-xs font-semibold text-gray-400">
                    Total Owed
                  </p>

                  <p className="text-lg font-medium">
                    {formatNaira(data.totalOwed || 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4 space-y-4 shadow shadow-gray-200">
              <div>
                <p className="text-xl font-medium">Recent Orders</p>
                <p className="text-gray-500 text-sm">
                  View your recent orders and their status.
                </p>
              </div>

              <RecentOrdersTable data={data.recentOrders} loading={isLoading} />
            </div>
          </div>

          <div className="w-full space-y-3">
            <div className="border rounded-md p-5 shadow shadow-gray-200">
              <p className="text-xl font-medium text-gray-600">
                Top Sales Channels
              </p>

              {!data.topChannels ? (
                <div className="min-h-[8rem] flex text-center items-center justify-center">
                  <div className="space-y-2">
                    <p className="text-gray-400 text-xs">
                      No sales data available
                    </p>

                    <Button
                      className="text-xs px-3 py-1.5 mx-auto"
                      onClick={() => router.push('/orders/new')}
                    >
                      Create order
                    </Button>
                  </div>
                </div>
              ) : (
                <>
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
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="flex flex-wrap justify-center space-x-4">
                    {topChannels.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                        <span className="text-sm text-gray-600">
                          {entry._id}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="border rounded-md p-3 shadow shadow-gray-200 space-y-3">
              <p className="font-medium text-sm">Quick Actions</p>

              <div className="space-y-1">
                {quickActions.map((action, index) => (
                  <div key={index}>
                    <Link
                      href={action.href}
                      className="p-3 bg-gray-50 text-sm font-semibold text-secondary rounded-lg flex items-center gap-2"
                    >
                      {action.icon} <span>{action.name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
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

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white py-2 px-3 shadow-md rounded-lg border border-gray-200">
      <p className="text-sm font-semibold text-gray-700">{payload[0].name}</p>
      <p className="text-sm text-gray-500">Sales: {payload[0].value}</p>
    </div>
  );
};

export default Dashboard;
