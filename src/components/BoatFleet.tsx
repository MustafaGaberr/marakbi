import BoatCard from './BoatCard';

const BoatFleet = ({ homeData }: { homeData: any }) => {
  const boats = homeData?.new_joiners || [];

  return (
    <section className="relative w-full overflow-hidden py-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: "url('/images/Frame 1321316346.png')"}}
      ></div>
      
  

      <div className="relative">
        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center text-center mb-10 ">
         
          {/* Title */}
          <h2 className="text-white text-3xl md:text-5xl font-semibold font-poppins mb-4 mt-4">
            Fleet of Luxury Boats
          </h2>

          {/* Mobile Line - تحت العنوان مباشرة */}
          <div className="flex justify-center mb-4 md:hidden">
            <img src="/icons/Line 74.svg" alt="Decorative line" className="h-4" />
          </div>

            {/* Description */}
            <p className="text-white text-s font-normal font-poppins max-w-4xl leading-relaxed px-4 mb-6">
            Explore our exquisite collection of high-end yachts and premium vessels, perfect for tailored trips across Aswan&apos;s majestic Nile and Egypt&apos;s stunning Red Sea.
            </p>

          {/* Desktop Line - بعد الفقرة */}
          <div className="hidden md:flex justify-center">
            <img 
              src="/icons/Line 74.svg" 
              alt="Decorative line"
              className="h-4"
            />
          </div>
        </div>

        {/* Boat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12 px-4 place-items-center md:place-items-stretch">
          {boats.length > 0 ? (
            boats.map((boat: any, index: number) => (
              <BoatCard
                key={boat.id || index}
                imageUrl={boat.images?.[0] || boat.image || '/images/Rectangle 3463853.png'}
                name={boat.name}
                price={`EGP ${boat.price_per_hour || boat.price || 0} /Hour`}
                location={boat.cities?.[0] || boat.location || 'Aswan- Egypt'}
                guests={boat.max_seats}
                status="available"
                rooms={boat.max_seats_stay}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-white">
              <p>No boats available at the moment.</p>
            </div>
          )}
        </div>

        {/* View All Boats Button */}
        <div className="text-center px-4">
          <button className="w-full max-w-md sm:w-auto sm:min-w-[280px] h-12 px-8 bg-[#0C4A8C] rounded-lg text-white text-base font-normal font-poppins capitalize hover:bg-[#0A3D7A] transition-colors">
            View all boats
          </button>
        </div>
      </div>
    </section>
  );
};

export default BoatFleet;