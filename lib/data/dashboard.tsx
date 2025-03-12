interface SidebarGroup {
  name: string;
  items: SidebarItem[];
}

interface SidebarItem {
  name: string;
  icon: string;
  href: string;
}

export const sidebar: SidebarGroup[] = [
  {
    name: "Dashboard",
    items: [
      {
        name: "Home",
        icon: "home",
        href: "/dashboard",
      },
      {
        name: "Analytics",
        icon: "chart-bar",
        href: "/dashboard/analytics",
      },
      {
        name: "Settings",
        icon: "cog",
        href: "/dashboard/settings",
      },
    ],
  },
  {
    name: "Products",
    items: [
      {
        name: "All Products",
        icon: "cube",
        href: "/dashboard/products",
      },
      {
        name: "Add Product",
        icon: "plus",
        href: "/dashboard/products/add",
      },
    ],
  },
  {
    name: "Orders",
    items: [
      {
        name: "All Orders",
        icon: "shopping-cart",
        href: "/dashboard/orders",
      },
      {
        name: "Add Order",
        icon: "plus",
        href: "/dashboard/orders/add",
      },
    ],
  },
  {
    name: "Customers",
    items: [
      {
        name: "All Customers",
        icon: "users",
        href: "/dashboard/customers",
      },
      {
        name: "Add Customer",
        icon: "user-plus",
        href: "/dashboard/customers/add",
      },
    ],
  },
  {
    name: "Settings",
    items: [
      {
        name: "General",
        icon: "cog",
        href: "/dashboard/settings/general",
      },
      {
        name: "Billing",
        icon: "credit-card",
        href: "/dashboard/settings/billing",
      },
      {
        name: "Users",
        icon: "users",
        href: "/dashboard/settings/users",
      },
    ],
  },
];
