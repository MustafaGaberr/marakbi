"use client";
import useAdminTab from "../../_hooks/useAdminTab";
import AdminDashboardNavbarSingleTab from "./AdminDashboardNavbarSingleTab";

type navItemsType = {
  tabId: "overview" | "orders" | "boat-listings" | "bookings" | "users";
  tabLabel: string;
}[];

export default function AdminDashboardNavbar() {
  const { currentTab, setTab } = useAdminTab();

  const navItems: navItemsType = [
    { tabId: "overview", tabLabel: "Overview" },
    { tabId: "orders", tabLabel: "Orders" },
    { tabId: "boat-listings", tabLabel: "Boat Listings" },
    { tabId: "bookings", tabLabel: "Bookings" },
    { tabId: "users", tabLabel: "Users" },
  ];

  return (
    <div
      className="
        bg-[#ecebef]
        rounded-2xl
        py-1 px-1
        flex
        gap-1
        overflow-x-auto
        scrollbar-hide
        sm:flex-wrap
        sm:justify-start
      "
    >
      {navItems.map((item) => (
        <AdminDashboardNavbarSingleTab
          key={item.tabId}
          label={item.tabLabel}
          isActive={currentTab === item.tabId}
          onClick={() => setTab(item.tabId)}
        />
      ))}
    </div>
  );
}
