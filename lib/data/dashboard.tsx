import { ReactNode } from 'react';
import {
  LuLayoutDashboard,
  LuShoppingBag,
  LuTag,
  LuUsers,
} from 'react-icons/lu';
import { CiDiscount1 } from 'react-icons/ci';
import { PiMoneyWavy } from 'react-icons/pi';
import { MdOutlineAccountBalance } from 'react-icons/md';

interface SidebarItem {
  name: string;
  icon: ReactNode;
  href: string;
}

export const sidebarLinks: SidebarItem[] = [
  {
    name: 'Dashboard',
    icon: <LuLayoutDashboard />,
    href: '/dashboard',
  },
  {
    name: 'Products',
    icon: <LuTag />,
    href: '/products',
  },
  {
    name: 'Orders',
    icon: <LuShoppingBag />,
    href: '/orders',
  },
  {
    name: 'Customers',
    icon: <LuUsers />,
    href: '/customers',
  },
  {
    name: 'Promotions',
    icon: <CiDiscount1 />,
    href: '/promotions',
  },
  {
    name: 'Expenses',
    icon: <MdOutlineAccountBalance />,
    href: '/expenses',
  },
  {
    name: 'Transactions',
    icon: <PiMoneyWavy />,
    href: '/transactions',
  },
];
