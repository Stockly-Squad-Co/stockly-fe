"use client";

import useAppStore from "@/lib/store/app.store";
import { SiNanostores } from "react-icons/si";
import { FiSidebar } from "react-icons/fi";

const DashboardNavbar = () => {
  const { toggleSidebar } = useAppStore();

  return (
    <nav className="flex items-center sticky h-[3.5rem] overflow-hidden top-0 border-b z-[100] bg-white justify-between w-screen">
      <div className="border-gray-300 flex-1 p-3 flex items-center justify-between gap-2 border-r">
        <SiNanostores
          size={28}
          onClick={toggleSidebar}
          className="cursor-pointer"
        />

        <FiSidebar className="cursor-pointer" onClick={toggleSidebar} />
      </div>

      <div className="flex-[6] flex items-center justify-between p-4">
        <div className="border rounded-full px-8 py-4"></div>
        <div className="border rounded-full px-8 py-4"></div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
