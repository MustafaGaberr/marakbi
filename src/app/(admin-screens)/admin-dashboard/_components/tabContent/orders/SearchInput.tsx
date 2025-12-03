import React from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchInput() {
  return (
    <div className="bg-[#F3F3F5] flex items-center gap-2 px-3 py-2 rounded-lg w-full">
      <CiSearch className="text-[#717182] text-lg" />
      <input
        type="text"
        placeholder="Search by order #, customer, or boat..."
        className="bg-transparent outline-none text-sm flex-1"
      />
    </div>
  );
}
