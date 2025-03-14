"use client";
import React from "react";
import OrdersHeader from "./header";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/services/order.service";
import OrdersTable from "../Tables/orders";

const OrdersPage = () => {
  const { data: orders, isLoading: fetchingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <section className="md:px-6 md:py-4 p-4 space-y-6">
      <OrdersHeader />

      <OrdersTable data={orders} loading={fetchingOrders} />
    </section>
  );
};

export default OrdersPage;
