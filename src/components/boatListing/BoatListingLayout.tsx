"use client";

import { useState } from "react";
import BoatCard from "../BoatCard";
import FilterButton from "./FilterButton";
import FiltersPanel from "./FiltersPanel";
import { MdOutlineTune } from "react-icons/md";
import { boatFleetData } from "@/data/boats";

export default function BoatListingLayout() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="relative mt-10 sm:mt-12 lg:mt-16 z-0">
      {/* Filter Bar Background + Buttons */}
      <div className="relative z-10 bg-white border-b border-[rgba(0,0,0,0.1)]">
        <div className="flex gap-3 sm:gap-4 px-4 sm:px-8 lg:px-16 py-3 overflow-x-auto">
          <FilterButton onClick={() => {}} label="Price" />
          <FilterButton onClick={() => {}} label="Boats" />
          <FilterButton onClick={() => {}} label="Cabins" />
          <FilterButton onClick={() => {}} label="Activities" />
          <FilterButton
            icon={MdOutlineTune}
            onClick={() => setIsFiltersOpen(true)}
            label="More Filters"
          />
        </div>
      </div>

      {/* Filters Panel */}
      <FiltersPanel
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      />

      {/* Heading */}
      <div className="relative z-0 px-4 sm:px-8 lg:px-16 pt-6 md:pt-8">
        <p className="hidden md:block text-2xl sm:text-3xl lg:text-[32px] mb-6 font-medium">
          Boats in Aswan
          <span className="text-[#7D7D7D] ml-3 text-sm sm:text-base font-normal">
            ({boatFleetData.length} found)
          </span>
        </p>

        {/* Boat Cards Grid */}
        <div className="relative z-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 pb-24 max-w-6xl lg:max-w-7xl mx-auto place-items-center sm:place-items-stretch">
          {boatFleetData.map((boat) => (
            <BoatCard
              key={boat.id}
              boatId={boat.id}
              imageUrl={boat.images?.[0] || "/images/Rectangle 3463853.png"}
              name={boat.name}
              price={`${boat.price_per_hour}`}
              location={boat.location || boat.cities?.[0] || "Aswan - Egypt"}
              guests={boat.max_seats}
              rooms={boat.max_seats_stay}
              status={boat.status || "Available"}
              rating={boat.rating}
              reviewsCount={boat.reviewsCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
