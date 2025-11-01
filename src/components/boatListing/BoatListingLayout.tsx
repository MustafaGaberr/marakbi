"use client";

import BoatCard from "../BoatCard";
import FilterButton from "./FilterButton";
import { MdOutlineTune } from "react-icons/md";
import { boatFleetData } from "@/data/boats";

export default function BoatListingLayout() {
  return (
    <div className="mt-24">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 sm:gap-4 px-4 sm:px-8 lg:px-16 mb-4">
        <FilterButton onClick={() => {}} label="Price" />
        <FilterButton onClick={() => {}} label="Boats" />
        <FilterButton onClick={() => {}} label="Cabins" />
        <FilterButton onClick={() => {}} label="Activities" />
        <FilterButton
          icon={MdOutlineTune}
          onClick={() => {}}
          label="More filters"
        />
      </div>

      <div className="bg-[#A0A0A0] h-px mx-4 sm:mx-8 lg:mx-16" />

      {/* Heading */}
      <div className="px-4 sm:px-8 lg:px-16">
        <p className="text-2xl sm:text-3xl lg:text-[32px] my-6 font-medium">
          Boats in Aswan
          <span className="text-[#7D7D7D] ml-3 text-sm sm:text-base font-normal">
            ({boatFleetData.length} found)
          </span>
        </p>

        {/* Boat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 pb-24 max-w-6xl lg:max-w-7xl mx-auto place-items-center sm:place-items-stretch">
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
