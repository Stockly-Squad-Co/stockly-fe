'use client';

import useAppStore from '@/lib/store/app.store';
import { SiNanostores } from 'react-icons/si';
import { FiSidebar } from 'react-icons/fi';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import useUserStore from '@/lib/store/user.store';
import { BiChevronDown } from 'react-icons/bi';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion, Variant } from 'framer-motion';
import { LuCircleUser, LuClipboardCopy, LuStore, LuUser } from 'react-icons/lu';
import { PiStorefront } from 'react-icons/pi';
import { copyToClipboard } from '@/lib/utils';

const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;

const expansionVariant: Record<string, Variant> = {
  closed: {
    scale: 0,
    opacity: 0,
  },
  opened: {
    scale: 1,
    opacity: 1,
  },
};

const DashboardNavbar = () => {
  const { user } = useUserStore();
  const { toggleSidebar, sidebarOpen } = useAppStore();

  const [storeDetailsOpen, setStoreDetailsOpen] = useState(false);

  const store_link = useMemo(() => `${baseUrl}/s/${user?.store?.slug}`, [user]);

  return (
    <nav className="flex items-center sticky h-[3.5rem] top-0 border-b z-[100] bg-white justify-between w-screen">
      <div
        className={cn(
          'border-gray-300 p-3 flex items-center justify-between gap-2 border-r duration-300',
          sidebarOpen && 'flex-1',
          !sidebarOpen && 'w-[55px]'
        )}
      >
        {sidebarOpen && (
          <div className="text-primary flex items-center gap-1">
            <SiNanostores />
            <span>Stockly</span>
          </div>
        )}

        <FiSidebar
          className={cn('cursor-pointer', !sidebarOpen && 'flex-1')}
          onClick={toggleSidebar}
        />
      </div>

      <div className="flex-[5] flex items-center justify-end p-4">
        <div className="relative">
          <div
            onClick={() => setStoreDetailsOpen((prev) => !prev)}
            className="flex items-center justify-between gap-2 text-[.9rem] hover:bg-secondary/5 cursor-pointer p-2 rounded-md duration-100 relative"
          >
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
                  storeDetailsOpen ? '-rotate-180' : 'rotate-360',
                  'transition-all duration-200'
                )}
              />
            </span>
          </div>

          {storeDetailsOpen && (
            <AnimatePresence>
              <motion.div
                variants={expansionVariant}
                initial="closed"
                animate="opened"
                exit="closed"
                className="absolute rounded-md shadow-md bg-white z-[4] top-[105%] max-w-[300px] right-0 border text-[.9rem] w-screen"
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
                      'Store link copied successfully'
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
                      'Business ID copied successfully'
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
