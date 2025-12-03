"use client";
import DashboardStatsCard from "./DashboardStatsCard";
import { LuDollarSign } from "react-icons/lu";
import AdminDashboardNavbar from "./navbar/AdminDashboardNavbar";
import useAdminTab from "../_hooks/useAdminTab";
import AdminOverviewLayout from "./tabContent/overview/AdminOverviewLayout";
import AdminOrdersLayout from "./tabContent/orders/AdminOrdersLayout";
import AdminBoatListingLayout from "./tabContent/boatListings/AdminBoatListingLayout";
import AdminBookingsLayout from "./tabContent/bookings/AdminBookingsLayout";
import AdminUsersLayout from "./tabContent/users/AdminUsersLayout";

export default function AdminDashboardLayout() {
  const { currentTab } = useAdminTab();

  return (
    <div className="px-[30px] py-[65px]">
      <div className="bg-[#ECECF04D] p-[26px] flex flex-col gap-[26px]">
        <div className="flex justify-between flex-col lg:flex-row gap-[17px]">
          <DashboardStatsCard
            trending
            trendingUp
            description="+12.5%"
            icon={LuDollarSign}
            info="$124,500"
            label="Total Revenue"
          />
          <DashboardStatsCard
            trending
            trendingUp
            description="+12.5%"
            icon={LuDollarSign}
            info="$124,500"
            label="Total Revenue"
          />
          <DashboardStatsCard
            trending
            trendingUp
            description="+12.5%"
            icon={LuDollarSign}
            info="$124,500"
            label="Total Revenue"
          />
          <DashboardStatsCard
            trending
            trendingUp
            description="+12.5%"
            icon={LuDollarSign}
            info="$124,500"
            label="Total Revenue"
          />
        </div>
        <AdminDashboardNavbar />
        <div>
          {currentTab === "overview" && <AdminOverviewLayout />}
          {currentTab === "orders" && <AdminOrdersLayout />}
          {currentTab === "boat-listings" && <AdminBoatListingLayout />}
          {currentTab === "bookings" && <AdminBookingsLayout />}
          {currentTab === "users" && <AdminUsersLayout />}
        </div>
      </div>
    </div>
  );
}
