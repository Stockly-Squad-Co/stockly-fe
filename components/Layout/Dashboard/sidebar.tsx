'use client';

import { sidebarLinks } from '@/lib/data/dashboard';
import useAppStore from '@/lib/store/app.store';
import { cn } from '@/lib/utils/cn';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { LuLogOut } from 'react-icons/lu';
import { signOut as apiSignOut } from '@/lib/services/auth.service';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import { toast } from 'sonner';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { sidebarOpen } = useAppStore();

  const { mutateAsync: logOut, isPending: loggingOut } = useMutation({
    mutationKey: ['sign-out'],
    mutationFn: async () => {
      await apiSignOut();
      await nextAuthSignOut();
    },
    onSuccess() {
      toast.success('Signed out successfully');
      redirect('/login');
    },
    onError(error) {
      toast.error(error?.message);
    },
  });

  return (
    <aside
      className={`h-[calc(100vh-3.5rem)] p-[9.5px] relative duration-300 overflow-y-auto ${
        sidebarOpen ? 'flex-1' : 'w-[55px]'
      } border-r border-gray-300 scrollbar-none`}
    >
      <ul className="space-y-3 mt-8">
        {sidebarLinks.map((link, index) => {
          const is_current_route = pathname.startsWith(link.href);

          return (
            <Link
              href={link?.href}
              className={cn(
                'flex gap-2 px-2 py-3 rounded-md border-l-4 items-center cursor-pointer border-transparent hover:border-secondary hover:bg-secondary/5 transition-all duration-300 text-[.9rem]',
                is_current_route &&
                  'border-secondary bg-secondary/5 text-secondary font-bold'
              )}
              key={index}
            >
              <span
                className={cn(
                  'text-[1.1rem]',
                  is_current_route ? 'text-secondary' : ''
                )}
              >
                {link.icon}
              </span>

              {sidebarOpen && link.name}
            </Link>
          );
        })}

        <li
          className={cn(
            'py-3 px-2 text-[.9rem] flex items-center gap-2 hover:text-secondary hover:font-bold cursor-pointer duration-200',
            loggingOut && 'text-secondary font-bold animate-pulse'
          )}
          onClick={() => logOut()}
        >
          <LuLogOut />
          Sign Out
        </li>
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
