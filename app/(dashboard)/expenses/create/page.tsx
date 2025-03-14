import CreateExpense from "@/components/UI/Dashboard/Expense/create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Expense",
};

const Page = () => <CreateExpense />;

export default Page;
