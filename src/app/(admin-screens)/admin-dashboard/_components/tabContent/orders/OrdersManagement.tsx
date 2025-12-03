"use client";
import AdminDashboardButton from "../../AdminDashboardButton";
import { FiDownload } from "react-icons/fi";
import SearchInput from "./SearchInput";
import FilterComponent from "./FilterComponent";
import OrdersTable from "./OrdersTable";

export default function OrdersManagement() {
  return (
    <div className="bg-white rounded-[15.09px] p-[26px]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center mb-8 justify-between gap-3">
        <div>
          <p className="text-[#0A0A0A] font-medium text-lg">
            Orders Management
          </p>
          <p className="text-[#717182] font-normal">
            View and manage all boat rental orders
          </p>
        </div>

        <div className="self-start md:self-auto">
          <AdminDashboardButton
            onClick={() => {}}
            icon={FiDownload}
            label="Export"
          />
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        <SearchInput />

        <div className="flex flex-col sm:flex-row gap-3">
          <FilterComponent
            selectItems={[
              "All Status",
              "Confirmed",
              "Pending",
              "In progress",
              "Cancelled",
              "Completed",
            ]}
          />

          <FilterComponent
            selectItems={["All Payments", "Pending", "Paid", "Refunded"]}
          />
        </div>
      </div>

      {/* Table */}
      <OrdersTable />
    </div>
  );
}
