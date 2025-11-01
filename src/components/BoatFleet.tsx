import BoatCard from './BoatCard';
import Link from 'next/link';
import { boatFleetData } from '@/data/boats';

const BoatFleet = () => {
  return (
    <section className="relative w-full overflow-hidden py-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat h-110"
        style={{backgroundImage: "url('/images/Frame 1321316346.png')"}}
      ></div>
      
  

      <div className="relative">
        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
         
          {/* Title */}
          <h2 className="text-white text-3xl md:text-5xl font-semibold font-poppins mb-4 mt-4">
            Fleet of Luxury Boats
          </h2>

          {/* Golden Wavy Line - Mobile Only */}
          <div className="flex justify-center mb-4 md:hidden">
            <img 
              src="/icons/Line 74.svg" 
              alt="Decorative line"
              className="h-4"
            />
          </div>

          {/* Description */}
          <p className="text-white text-s font-normal font-poppins max-w-4xl leading-relaxed px-4 mb-6">
            Explore our exquisite collection of high-end yachts and premium vessels, perfect for tailored trips across Aswan&apos;s majestic Nile and Egypt&apos;s stunning Red Sea.
          </p>

          {/* Golden Wavy Line - Desktop Only */}
          <div className="hidden md:flex justify-center">
            <img 
              src="/icons/Line 74.svg" 
              alt="Decorative line"
              className="h-4"
            />
          </div>
        </div>

        {/* Boat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 max-w-6xl lg:max-w-7xl mx-auto mb-12 px-4 lg:px-0 place-items-center md:place-items-stretch lg:place-items-start">
          {boatFleetData.map((boat, index: number) => {
            return (
              <BoatCard
                key={boat.id || index}
                imageUrl={boat.images?.[0] || '/images/Rectangle 3463853.png'}
                name={boat.name || 'Boat'}
                price={`${boat.price_per_hour ?? 0}`}
                location={boat.location || boat.cities?.[0] || 'Aswan - Egypt'}
                guests={boat.max_seats || 4}
                status={boat.status || 'Available'}
                rooms={boat.max_seats_stay || 2}
                rating={boat.rating || 5}
                reviewsCount={boat.reviewsCount || 0}
              />
            );
          })}
        </div>

        {/* View All Boats Button */}
        <div className="text-center px-4">
          <Link href="/boat-listing" className="w-full max-w-md sm:w-auto sm:min-w-[280px] h-12 px-8 py-2.5 bg-[#0C4A8C] rounded-lg text-white text-base font-normal font-poppins capitalize hover:bg-[#0A3D7A] transition-colors inline-flex justify-center items-center">
            View All Boats
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BoatFleet;