"use client";
import SmallContentBox from "@/components/Common/Box/small";
import Button from "@/components/Common/Button";
import { getOrdersOverview } from "@/lib/services/order.service";
import { formatNaira } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { LuBox, LuHandCoins, LuShoppingBag, LuTag } from "react-icons/lu";

const OrdersHeader = () => {
  const { data: overview, isPending: loading } = useQuery({
    queryKey: ["orders", "overview"],
    queryFn: getOrdersOverview,
  });

  return (
    <>
      <header className="flex items-center gap-4 justify-between">
        <h1 className="text-[1.7rem] font-bold">Products</h1>
        <Link href="/orders/new">
          <Button
            variant="filled"
            size="medium"
            iconPosition="left"
            icon={<BiPlus />}
          >
            Create Order
          </Button>
        </Link>
      </header>

      <main className="mt-6">
        <div className="flex items-center gap-4">
          <SmallContentBox
            boxBg="#e0f2fe"
            iconColor="#0369a1"
            icon={<LuShoppingBag />}
            value={overview?.totalOrders}
            boxKey="Total Orders"
          />

          <SmallContentBox
            boxBg="#f0fdf4"
            iconColor="#16a34a"
            icon={<LuHandCoins />}
            value={loading ? "--.--" : formatNaira(overview?.amountOwed!)}
            boxKey="Amount Owed"
          />

          <SmallContentBox
            boxBg="#fefce8"
            iconColor="#ca8a04"
            icon={<LuTag />}
            value={overview?.completedOrders}
            boxKey="Completed Orders"
          />

          <SmallContentBox
            boxBg="#fef2f2"
            iconColor="#b91c1c"
            icon={<LuBox />}
            value={overview?.unpaidOrders}
            boxKey="Unpaid Orders"
          />
        </div>
      </main>
    </>
  );
};

export default OrdersHeader;
