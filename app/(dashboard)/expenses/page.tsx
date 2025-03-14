import Expenses from "@/components/UI/Dashboard/Expense";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Expenses",
};

const Page = () => <Expenses />;

export default Page;
