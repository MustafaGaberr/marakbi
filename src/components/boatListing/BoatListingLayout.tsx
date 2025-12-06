"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BoatCard from "../BoatCard";
import FilterButton from "./FilterButton";
import FiltersPanel from "./FiltersPanel";
import { MdOutlineTune } from "react-icons/md";
import { clientApi, Boat } from "@/lib/api";

export default function BoatListingLayout() {
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalBoats, setTotalBoats] = useState(0);
  
  // جلب الفلاتر من URL
  const cityId = searchParams.get('city_id');
  const categoryId = searchParams.get('category_id');
  const rentalType = searchParams.get('rental_type');

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        setLoading(true);
        let response;
        
        // جلب المراكب حسب الفلاتر
        if (cityId && categoryId) {
          response = await clientApi.getBoatsByCategoryAndCity(parseInt(categoryId), parseInt(cityId));
        } else if (categoryId) {
          response = await clientApi.getBoatsByCategory(parseInt(categoryId));
        } else {
          response = await clientApi.getBoats(1, 20);
        }
        
        if (response.success && response.data) {
          setBoats(response.data.boats || []);
          setTotalBoats(response.data.total || response.data.boats?.length || 0);
        }
      } catch (error) {
        console.error('Error fetching boats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBoats();
  }, [cityId, categoryId, rentalType]);

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
          Available Boats
          <span className="text-[#7D7D7D] ml-3 text-sm sm:text-base font-normal">
            ({totalBoats} found)
          </span>
        </p>

        {/* Boat Cards Grid */}
        <div className="relative z-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 pb-24 max-w-6xl lg:max-w-7xl mx-auto place-items-center sm:place-items-stretch">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-900 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading boats...</p>
            </div>
          ) : boats.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No boats found matching your criteria.</p>
            </div>
          ) : (
            boats.map((boat) => (
              <BoatCard
                key={boat.id}
                boatId={boat.id}
                imageUrl={boat.images?.[0] || "/images/Rectangle 3463853.png"}
                name={boat.name}
                price={`${boat.price_per_hour}`}
                location={boat.cities?.[0] || "Aswan - Egypt"}
                guests={boat.max_seats}
                rooms={boat.max_seats_stay}
                status="Available"
                rating={5}
                reviewsCount={boat.total_reviews || 0}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
