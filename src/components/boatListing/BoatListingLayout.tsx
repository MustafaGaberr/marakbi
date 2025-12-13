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
          // Get more boats if searching to have more results to filter
          response = await clientApi.getBoats(1, searchQuery ? 100 : 20);
        }
        
        if (response.success && response.data) {
          let filteredBoats = response.data.boats || [];
          
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
  }, [cityId, categoryId, rentalType, searchQuery]);

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
