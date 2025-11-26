"use client";

import { useState } from "react";
import Image from "next/image";

interface FiltersPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FiltersPanel({ isOpen, onClose }: FiltersPanelProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBoatTypes, setSelectedBoatTypes] = useState<string[]>([]);
  const [selectedCabins, setSelectedCabins] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const boatTypes = [
    { name: "Dahabiya", count: 45 },
    { name: "Kombine", count: 32 },
    { name: "Luxury Yacht", count: 28 },
    { name: "Cruise Ship", count: 18 },
    { name: "Sailboat", count: 25 },
    { name: "Catamaran", count: 15 },
  ];

  const cabins = [
    { name: "1-2 Cabins", count: 35 },
    { name: "3-4 Cabins", count: 58 },
    { name: "5-6 Cabins", count: 42 },
    { name: "7+ Cabins", count: 15 },
  ];

  const activities = [
    { name: "Fishing", count: 67 },
    { name: "Scuba Diving", count: 89 },
    { name: "Snorkeling", count: 102 },
    { name: "Water Skiing", count: 45 },
    { name: "Sunset Cruise", count: 78 },
    { name: "Party Boat", count: 34 },
  ];

  const toggleBoatType = (name: string) => {
    setSelectedBoatTypes((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const toggleCabin = (name: string) => {
    setSelectedCabins((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleActivity = (name: string) => {
    setSelectedActivities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleClearAll = () => {
    setPriceRange([0, 1000]);
    setSelectedBoatTypes([]);
    setSelectedCabins([]);
    setSelectedActivities([]);
  };

  const handleApplyFilters = () => {
    // Apply filters logic here
    console.log("Applying filters:", {
      priceRange,
      selectedBoatTypes,
      selectedCabins,
      selectedActivities,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 pointer-events-auto"
        onClick={onClose}
        />

      {/* Filters Panel */}
      <div className="fixed right-0 top-0 h-full w-[352px] bg-white border-l border-[rgba(0,0,0,0.1)] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-y-auto pointer-events-auto">
        {/* Header */}
        <div className="px-4 py-4 border-b border-[rgba(0,0,0,0.1)]">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-base font-poppins font-semibold text-neutral-950 mb-1">
                Filter Boats
              </h2>
              <p className="text-sm font-poppins font-normal text-[#717182]">
                Refine your search with filters
              </p>
            </div>
            <button
              onClick={onClose}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Filters Content */}
        <div className="px-4 py-6 pb-24 space-y-6">
          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                      stroke="#030213"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <label className="text-sm font-poppins font-medium text-neutral-950">
                  Price Range
                </label>
              </div>
              <span className="text-sm font-poppins font-normal text-[#717182]">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>

            {/* Slider */}
            <div className="relative h-1 bg-[#030213] rounded-full">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-[#030213] rounded-full shadow-md cursor-pointer z-10"
                style={{ left: `calc(${(priceRange[0] / 1000) * 100}% - 8px)` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-[#030213] rounded-full shadow-md cursor-pointer z-10"
                style={{ left: `calc(${(priceRange[1] / 1000) * 100}% - 8px)` }}
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([
                    Math.min(Number(e.target.value), priceRange[1]),
                    priceRange[1],
                  ])
                }
                className="absolute top-0 left-0 w-full h-1 bg-transparent appearance-none cursor-pointer z-20 opacity-0"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    Math.max(Number(e.target.value), priceRange[0]),
                  ])
                }
                className="absolute top-0 left-0 w-full h-1 bg-transparent appearance-none cursor-pointer z-20 opacity-0"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-poppins font-normal text-[#717182]">
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>

          {/* Boat Types */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v0M9 15v0M15 11v0"
                    stroke="#030213"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <label className="text-sm font-poppins font-medium text-neutral-950">
                Boat Types
              </label>
            </div>

            <div className="space-y-2">
              {boatTypes.map((type) => (
                <div
                  key={type.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBoatType(type.name)}
                      className={`w-4 h-4 rounded border ${
                        selectedBoatTypes.includes(type.name)
                          ? "bg-[#093b77] border-[#093b77]"
                          : "bg-[#f3f3f5] border-[rgba(0,0,0,0.1)]"
                      } flex items-center justify-center`}
                    >
                      {selectedBoatTypes.includes(type.name) && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                    <span className="text-sm font-poppins font-medium text-neutral-950">
                      {type.name}
                    </span>
                  </div>
                  <span className="text-xs font-poppins font-normal text-[#717182]">
                    ({type.count})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Number of Cabins */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                    stroke="#030213"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 22V12h6v10"
                    stroke="#030213"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <label className="text-sm font-poppins font-medium text-neutral-950">
                Number of Cabins
              </label>
            </div>

            <div className="space-y-2">
              {cabins.map((cabin) => (
                <div
                  key={cabin.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCabin(cabin.name)}
                      className={`w-4 h-4 rounded border ${
                        selectedCabins.includes(cabin.name)
                          ? "bg-[#093b77] border-[#093b77]"
                          : "bg-[#f3f3f5] border-[rgba(0,0,0,0.1)]"
                      } flex items-center justify-center`}
                    >
                      {selectedCabins.includes(cabin.name) && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                    <span className="text-sm font-poppins font-medium text-neutral-950">
                      {cabin.name}
                    </span>
                  </div>
                  <span className="text-xs font-poppins font-normal text-[#717182]">
                    ({cabin.count})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities Available */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
                    stroke="#030213"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <label className="text-sm font-poppins font-medium text-neutral-950">
                Activities Available
              </label>
            </div>

            <div className="space-y-2">
              {activities.map((activity) => (
                <div
                  key={activity.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActivity(activity.name)}
                      className={`w-4 h-4 rounded border ${
                        selectedActivities.includes(activity.name)
                          ? "bg-[#093b77] border-[#093b77]"
                          : "bg-[#f3f3f5] border-[rgba(0,0,0,0.1)]"
                      } flex items-center justify-center`}
                    >
                      {selectedActivities.includes(activity.name) && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                    <span className="text-sm font-poppins font-medium text-neutral-950">
                      {activity.name}
                    </span>
                  </div>
                  <span className="text-xs font-poppins font-normal text-[#717182]">
                    ({activity.count})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 left-0 right-0 border-t border-[rgba(0,0,0,0.1)] bg-white p-4 flex gap-2 mt-6">
          <button
            onClick={handleClearAll}
            className="flex-1 h-9 px-4 py-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg text-sm font-poppins font-medium text-neutral-950 hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 h-9 px-4 py-2 bg-[#093b77] rounded-lg text-sm font-poppins font-medium text-white hover:bg-[#0a4489] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

