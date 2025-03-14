"use client";

import useAppStore from "@/lib/store/app.store";
import { SiNanostores } from "react-icons/si";
import { FiSidebar } from "react-icons/fi";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import useUserStore from "@/lib/store/user.store";
import { BiChevronDown } from "react-icons/bi";
import { useMemo } from "react";
import { AnimatePresence, motion, Variant } from "framer-motion";
import { LuCircleUser, LuClipboardCopy, LuStore } from "react-icons/lu";
import { PiStorefront } from "react-icons/pi";
import { copyToClipboard } from "@/lib/utils";
import useDropDown from "@/lib/hooks/useDropdown";
import { fadeToBottomVariant } from "@/lib/data/variants";
import useUserInfo from "@/lib/hooks/useUserInfo";
import { useModal } from "@/lib/providers/ModalProvider";
import UpgradePlanModal from "./update-plan-modal";

const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;

const DashboardNavbar = () => {
  const { user } = useUserStore();
  const { toggleSidebar, sidebarOpen } = useAppStore();

  const { dropdownRef, isOpen, toggleDropdown } = useDropDown();

  const { showModal } = useModal();

  const store_link = useMemo(() => `${baseUrl}/s/${user?.store?.slug}`, [user]);

  return (
    <nav className="flex items-center sticky h-[3.5rem] top-0 border-b z-[100] bg-white justify-between w-screen">
      <div
        className={cn(
          "border-gray-300 p-3 flex flex-1 items-center justify-between gap-2 border-r duration-300"
          // sidebarOpen && "flex-1",
          // !sidebarOpen && "w-[55px]"
        )}
      >
        <div className="text-primary flex items-center gap-1">
          <SiNanostores />
          <span>Stockly</span>
        </div>
        {/* {sidebarOpen && (
        )} */}

        <FiSidebar className={cn("cursor-pointer")} onClick={toggleSidebar} />
      </div>

      <div className="flex-[5] flex items-center justify-between p-4">
        <div>
          {/* {user && (
            <p className="capitalize font-medium text-lg">
              Hello, {user.firstName}
            </p>
          )} */}

          <div
            className="px-4 py-1.5 rounded-full font-medium text-yellow-800 cursor-pointer bg-yellow-50 border border-yellow-500 text-xs select-none"
            onClick={() => showModal(<UpgradePlanModal />)}
          >
            Stockly Lite
          </div>
        </div>

        <div className="relative" ref={dropdownRef} onClick={toggleDropdown}>
          <div className="flex items-center justify-between gap-2 text-[.9rem] hover:bg-secondary/5 cursor-pointer p-2 rounded-md duration-100 relative">
            <Image
              alt="store-logo"
              src={user?.store?.logo!}
              width={30}
              height={30}
              className="w-[30px] h-[30px] rounded-full border border-secondary"
            />
            <p className="capitalize">{user?.store?.name}</p>

            <span className="text-[1.2rem] text-gray-500">
              <BiChevronDown
                className={cn(
                  isOpen ? "-rotate-180" : "rotate-360",
                  "transition-all duration-200"
                )}
              />
            </span>
          </div>

          {isOpen && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                {...fadeToBottomVariant}
                className="absolute rounded-md shadow-xl bg-white z-[4] top-[105%] max-w-[300px] right-0 border text-[.9rem] w-screen"
              >
                <li className="cursor-pointer flex items-center gap-2 w-full hover:border-l-secondary border-4 border-transparent hover:border-l-2 duration-300 p-2 hover:bg-secondary/5 hover:text-secondary">
                  <LuCircleUser size={20} /> Profile
                </li>

                <li className="cursor-pointer flex items-center gap-2 w-full hover:border-l-secondary border-4 border-transparent hover:border-l-2 duration-300 p-2 hover:bg-secondary/5 hover:text-secondary">
                  <LuStore size={20} /> Store Details
                </li>

                <li
                  onClick={() =>
                    copyToClipboard(
                      store_link,
                      "Store link copied successfully"
                    )
                  }
                  className="cursor-pointer flex items-center gap-2 w-full hover:border-l-secondary border-4 border-transparent hover:border-l-2 duration-300 p-2 hover:bg-secondary/5 hover:text-secondary"
                >
                  <LuClipboardCopy size={20} /> Copy Store Link
                </li>

                <li
                  onClick={() =>
                    copyToClipboard(
                      store_link,
                      "Business ID copied successfully"
                    )
                  }
                  className="cursor-pointer flex items-center gap-2 w-full hover:border-l-secondary border-4 border-transparent hover:border-l-2 duration-300 p-2 hover:bg-secondary/5 hover:text-secondary"
                >
                  <PiStorefront size={20} /> Business ID:
                  <span className="text-secondary font-bold">
                    {user?.store?.store_business_id}
                  </span>
                </li>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
