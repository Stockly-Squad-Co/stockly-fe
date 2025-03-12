"use client";

import useAppStore from "@/lib/store/app.store";

const DashboardSidebar = () => {
  const { sidebarOpen } = useAppStore();

  return (
    <aside
      className={`h-[calc(100vh-3.5rem)] p-[9.5px] relative duration-300 overflow-y-auto ${
        sidebarOpen ? "flex-1" : "w-[50px]"
      } border-r border-gray-300 scrollbar-none`}
    ></aside>
  );
};

export default DashboardSidebar;
