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
  const [allBoats, setAllBoats] = useState<Boat[]>([]); // Store all boats before filtering
  const [loading, setLoading] = useState(true);
  const [totalBoats, setTotalBoats] = useState(0);

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2500]);
  const [selectedBoatTypes, setSelectedBoatTypes] = useState<string[]>([]);
  const [selectedCabins, setSelectedCabins] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  // Dropdown states
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [boatsDropdownOpen, setBoatsDropdownOpen] = useState(false);
  const [cabinsDropdownOpen, setCabinsDropdownOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);

  // جلب الفلاتر من URL
  const cityId = searchParams.get('city_id');
  const categoryId = searchParams.get('category_id');
  const rentalType = searchParams.get('rental_type');
  const searchQuery = searchParams.get('search');

  // Mapping for common Arabic city names to English (for search)
  const cityNameMapping: Record<string, string[]> = {
    'أسوان': ['aswan', 'asuan', 'asswan'],
    'الأقصر': ['luxor', 'al uqsur', 'al uqsor', 'el uqsur'],
    'القاهرة': ['cairo', 'al qahira', 'el qahira'],
    'الإسكندرية': ['alexandria', 'al iskandariyah', 'el iskandariya'],
    'الغردقة': ['hurghada', 'al ghardaqah', 'el ghardaqa'],
    'شرم الشيخ': ['sharm el sheikh', 'sharm el sheik', 'sharm'],
    'مرسى مطروح': ['marsa matruh', 'marsa matrouh'],
    'دهب': ['dahab', 'dahb'],
    'نويبع': ['nuweiba', 'nueiba'],
    'طابا': ['taba'],
  };

  // Mapping for common Arabic category names to English
  const categoryNameMapping: Record<string, string[]> = {
    'مناسبات': ['occasion', 'occasions', 'event', 'events'],
    'أنشطة مائية': ['water activities', 'water activity', 'water sports'],
    'مراكب صيد': ['fishing', 'fishing boats', 'fish'],
    'مراكب خاصة': ['private', 'private boats'],
    'رحلات مشتركة': ['sharing', 'sharing trips', 'shared'],
    'مراكب سفر': ['travel', 'travel boats'],
    'دهبية': ['felucca', 'feluka', 'فلوكة'],
    'يخت': ['yacht', 'yachts'],
  };

  // Normalize Arabic text for better search
  const normalizeArabic = (text: string) =>
    text
      .toLowerCase()
      .replace(/أ|إ|آ|ء/g, 'ا')
      .replace(/ى|ئ/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/ؤ/g, 'و')
      .replace(/[ًٌٍَُِّْ]/g, '') // Remove diacritics
      .replace(/\s+/g, ' ') // collapse spaces
      .trim();

  // Check if query matches with Arabic-English mapping
  const matchesWithMapping = (query: string, source: string, mapping: Record<string, string[]>): boolean => {
    const normalizedQuery = normalizeArabic(query);
    const normalizedSource = normalizeArabic(source);

    // Direct match
    if (normalizedSource.includes(normalizedQuery)) return true;

    // Check Arabic query against English source using mapping
    for (const [arabicName, englishNames] of Object.entries(mapping)) {
      if (normalizeArabic(arabicName).includes(normalizedQuery)) {
        // If query matches Arabic name, check if source matches any English equivalent
        if (englishNames.some(en => normalizedSource.includes(en.toLowerCase()))) {
          return true;
        }
      }
    }

    // Check English query against Arabic source using mapping
    for (const [arabicName, englishNames] of Object.entries(mapping)) {
      if (englishNames.some(en => normalizedQuery.includes(en.toLowerCase()))) {
        // If query matches English name, check if source matches Arabic equivalent
        if (normalizeArabic(arabicName).includes(normalizedSource) || normalizedSource.includes(normalizeArabic(arabicName))) {
          return true;
        }
      }
    }

    return false;
  };

  // Extract unique boat types, cabins, and activities from boats
  const getUniqueBoatTypes = () => {
    const types = new Set<string>();
    allBoats.forEach(boat => {
      boat.categories?.forEach(cat => types.add(cat));
    });
    return Array.from(types);
  };

  // Apply all filters
  const applyFilters = () => {
    let filtered = [...allBoats];

    // Price filter
    filtered = filtered.filter(boat => {
      const price = boat.price_per_hour || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Boat types filter
    if (selectedBoatTypes.length > 0) {
      filtered = filtered.filter(boat =>
        boat.categories?.some(cat => selectedBoatTypes.includes(cat))
      );
    }

    // Cabins filter
    if (selectedCabins.length > 0) {
      filtered = filtered.filter(boat => {
        const cabinCount = boat.max_seats_stay || 0;
        return selectedCabins.some(cabin => {
          if (cabin === '1-2 Cabins') return cabinCount <= 2;
          if (cabin === '3-4 Cabins') return cabinCount >= 3 && cabinCount <= 4;
          if (cabin === '5-6 Cabins') return cabinCount >= 5 && cabinCount <= 6;
          if (cabin === '7+ Cabins') return cabinCount >= 7;
          return false;
        });
      });
    }

    // Activities filter (using categories as activities)
    if (selectedActivities.length > 0) {
      filtered = filtered.filter(boat =>
        boat.categories?.some(cat => selectedActivities.includes(cat))
      );
    }

    setBoats(filtered);
    setTotalBoats(filtered.length);
  };

  // Apply filters when they change
  useEffect(() => {
    if (allBoats.length > 0) {
      applyFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange, selectedBoatTypes, selectedCabins, selectedActivities, allBoats]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filter-dropdown')) {
        setPriceDropdownOpen(false);
        setBoatsDropdownOpen(false);
        setCabinsDropdownOpen(false);
        setActivitiesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  useEffect(() => {
    const fetchBoats = async () => {
      try {
        setLoading(true);
        let response;

        // Fetch boats - use specific endpoint if available for better performance
        // According to API documentation:
        // - /client/boats/category/{categoryId}/city/{cityId} - filter by both category and city
        // - /client/boats/category/{categoryId} - filter by category only
        // - When only cityId is provided, fetch all categories for that city, then get boats for each category
        if (categoryId && cityId) {
          // Both category and city provided - use API endpoint
          const categoryIdNum = parseInt(categoryId);
          const cityIdNum = parseInt(cityId);
          if (!isNaN(categoryIdNum) && !isNaN(cityIdNum)) {
            response = await clientApi.getBoatsByCategoryAndCity(categoryIdNum, cityIdNum);
          } else {
            // Invalid IDs, fallback to all boats
            response = await clientApi.getBoats(1, 100);
          }
        } else if (categoryId) {
          // Only category provided - use API endpoint
          const categoryIdNum = parseInt(categoryId);
          if (!isNaN(categoryIdNum)) {
            response = await clientApi.getBoatsByCategory(categoryIdNum);
          } else {
            // Invalid ID, fallback to all boats
            response = await clientApi.getBoats(1, 100);
          }
        } else if (cityId) {
          // Only city provided - fetch all categories for that city, then get boats for each
          const cityIdNum = parseInt(cityId);
          if (!isNaN(cityIdNum)) {
            // Get all categories for this city
            const categoriesResponse = await clientApi.getCategoriesByCity(cityIdNum);
            if (categoriesResponse.success && categoriesResponse.data) {
              const data = categoriesResponse.data;
              // API might return an array directly or wrapped in an object (e.g. { categories: [...] })
              const categories = Array.isArray(data)
                ? data
                : Array.isArray((data as { categories?: unknown[] }).categories)
                  ? (data as { categories: { id: number; name: string; description?: string }[] }).categories
                  : [];
              
              // Fetch boats for each category and combine results
              const allBoatsPromises = categories.map((cat: { id: number }) => 
                clientApi.getBoatsByCategoryAndCity(cat.id, cityIdNum)
              );
              
              const allResponses = await Promise.all(allBoatsPromises);
              
              // Combine all boats and remove duplicates
              const boatsMap = new Map<number, Boat>();
              allResponses.forEach(res => {
                if (res.success && res.data && res.data.boats) {
                  res.data.boats.forEach((boat: Boat) => {
                    boatsMap.set(boat.id, boat);
                  });
                }
              });
              
              // Create combined response
              const combinedBoats = Array.from(boatsMap.values());
              response = {
                success: true,
                data: {
                  boats: combinedBoats,
                  page: 1,
                  pages: 1,
                  per_page: combinedBoats.length,
                  total: combinedBoats.length
                }
              };
            } else {
              // If categories fetch fails, fallback to all boats
              response = await clientApi.getBoats(1, 100);
            }
          } else {
            // Invalid city ID, fallback to all boats
            response = await clientApi.getBoats(1, 100);
          }
        } else {
          // No category or city - fetch all boats
          response = await clientApi.getBoats(1, 100);
        }

        if (response.success && response.data) {
          let filteredBoats = response.data.boats || [];

          // Extract city names from trips array and add to boat object (for display purposes)
          filteredBoats = filteredBoats.map(boat => {
            // Get unique city names from trips
            const cityNames = boat.trips?.map((trip: { city_name?: string }) => trip.city_name).filter((name): name is string => Boolean(name)) || [];
            const uniqueCities = [...new Set(cityNames)];

            return {
              ...boat,
              cities: uniqueCities.length > 0 ? uniqueCities : (boat.cities || [])
            };
          });

          // Note: City filtering is already handled by API when cityId is provided
          // No need for additional client-side filtering in that case

          // Filter by rental type if provided
          if (rentalType) {
            if (rentalType.toLowerCase() === 'hourly') {
              // Show boats with hourly pricing
              filteredBoats = filteredBoats.filter(boat =>
                boat.price_per_hour && boat.price_per_hour > 0
              );
            } else if (rentalType.toLowerCase() === 'daily') {
              // Show boats with daily pricing
              filteredBoats = filteredBoats.filter(boat =>
                boat.price_per_day && boat.price_per_day > 0
              );
            }
          }

          // Store all boats for filtering
          setAllBoats(filteredBoats);

          // Filter by search query if provided
          if (searchQuery) {
            const normalizedQuery = normalizeArabic(searchQuery);
            filteredBoats = filteredBoats.filter(boat => {
              // Search in boat name (normalized)
              const normalizedName = normalizeArabic(boat.name);
              const nameMatch = normalizedName.includes(normalizedQuery);

              // Search in categories (normalized with mapping)
              const categoryMatch = boat.categories?.some(cat => {
                const normalizedCat = normalizeArabic(cat);
                return normalizedCat.includes(normalizedQuery) ||
                  matchesWithMapping(searchQuery, cat, categoryNameMapping);
              });

              // Search in cities (normalized with mapping)
              const cityMatch = boat.cities?.some(city => {
                const normalizedCity = normalizeArabic(city);
                return normalizedCity.includes(normalizedQuery) ||
                  matchesWithMapping(searchQuery, city, cityNameMapping);
              });

              return nameMatch || categoryMatch || cityMatch;
            });
          }

          setBoats(filteredBoats);
          setTotalBoats(filteredBoats.length);
        }
      } catch (error) {
        console.error('Error fetching boats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId, categoryId, rentalType, searchQuery]);

  return (
    <div className="relative mt-10 sm:mt-12 lg:mt-16 z-0">
      {/* Filter Bar Background + Buttons */}
      <div className="relative z-10 bg-white border-b border-[rgba(0,0,0,0.1)]">
        <div className="flex gap-3 sm:gap-4 px-4 sm:px-8 lg:px-16 py-3 overflow-x-auto relative">
          {/* Price Filter */}
          <div className="relative filter-dropdown">
            <FilterButton
              onClick={() => {
                setPriceDropdownOpen(!priceDropdownOpen);
                setBoatsDropdownOpen(false);
                setCabinsDropdownOpen(false);
                setActivitiesDropdownOpen(false);
              }}
              label={`Price${priceRange[0] > 0 || priceRange[1] < 2500 ? `: ${priceRange[0]}-${priceRange[1]}` : ''}`}
            />
            {priceDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="2500"
                      step="50"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="2500"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Boats Filter */}
          <div className="relative filter-dropdown">
            <FilterButton
              onClick={() => {
                setBoatsDropdownOpen(!boatsDropdownOpen);
                setPriceDropdownOpen(false);
                setCabinsDropdownOpen(false);
                setActivitiesDropdownOpen(false);
              }}
              label={`Boats${selectedBoatTypes.length > 0 ? ` (${selectedBoatTypes.length})` : ''}`}
            />
            {boatsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 max-h-80 overflow-y-auto">
                <div className="space-y-2">
                  {getUniqueBoatTypes().map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBoatTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBoatTypes([...selectedBoatTypes, type]);
                          } else {
                            setSelectedBoatTypes(selectedBoatTypes.filter(t => t !== type));
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cabins Filter */}
          <div className="relative filter-dropdown">
            <FilterButton
              onClick={() => {
                setCabinsDropdownOpen(!cabinsDropdownOpen);
                setPriceDropdownOpen(false);
                setBoatsDropdownOpen(false);
                setActivitiesDropdownOpen(false);
              }}
              label={`Cabins${selectedCabins.length > 0 ? ` (${selectedCabins.length})` : ''}`}
            />
            {cabinsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                <div className="space-y-2">
                  {['1-2 Cabins', '3-4 Cabins', '5-6 Cabins', '7+ Cabins'].map(cabin => (
                    <label key={cabin} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCabins.includes(cabin)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCabins([...selectedCabins, cabin]);
                          } else {
                            setSelectedCabins(selectedCabins.filter(c => c !== cabin));
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{cabin}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Activities Filter */}
          <div className="relative filter-dropdown">
            <FilterButton
              onClick={() => {
                setActivitiesDropdownOpen(!activitiesDropdownOpen);
                setPriceDropdownOpen(false);
                setBoatsDropdownOpen(false);
                setCabinsDropdownOpen(false);
              }}
              label={`Activities${selectedActivities.length > 0 ? ` (${selectedActivities.length})` : ''}`}
            />
            {activitiesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 max-h-80 overflow-y-auto">
                <div className="space-y-2">
                  {getUniqueBoatTypes().map(activity => (
                    <label key={activity} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedActivities.includes(activity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedActivities([...selectedActivities, activity]);
                          } else {
                            setSelectedActivities(selectedActivities.filter(a => a !== activity));
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{activity}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* More Filters */}
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
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedBoatTypes={selectedBoatTypes}
        setSelectedBoatTypes={setSelectedBoatTypes}
        selectedCabins={selectedCabins}
        setSelectedCabins={setSelectedCabins}
        selectedActivities={selectedActivities}
        setSelectedActivities={setSelectedActivities}
        boats={allBoats}
      />

      {/* Heading */}
      <div className="relative z-0 px-4 sm:px-8 lg:px-16 pt-6 md:pt-8">
        <p className="hidden md:block text-2xl sm:text-3xl lg:text-[32px] mb-6 font-medium">
          {searchQuery ? `Search results for "${searchQuery}"` : 'Available Boats'}
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
