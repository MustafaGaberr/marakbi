import BoatCard from './BoatCard';
import Link from 'next/link';

const BoatFleet = () => {
  // Dummy data for boats
  const boats = [
    {
      id: 1,
      name: "Luxury Yacht",
      price_per_hour: 500,
      max_seats: 8,
      max_seats_stay: 4,
      images: ["/images/Rectangle 3463853.png"],
      cities: ["Aswan"],
      location: "Aswan - Egypt",
      rating: 4.8,
      reviewsCount: 24
    },
    {
      id: 2,
      name: "Traditional Felucca",
      price_per_hour: 200,
      max_seats: 6,
      max_seats_stay: 2,
      images: ["/images/Rectangle 3463855.png"],
      cities: ["Aswan"],
      location: "Aswan - Egypt",
      rating: 4.5,
      reviewsCount: 18
    },
    {
      id: 3,
      name: "Speed Boat",
      price_per_hour: 300,
      max_seats: 4,
      max_seats_stay: 2,
      images: ["/images/Rectangle 3463856.png"],
      cities: ["Aswan"],
      location: "Aswan - Egypt",
      rating: 4.7,
      reviewsCount: 31
    },
    {
      id: 4,
      name: "Fishing Boat",
      price_per_hour: 150,
      max_seats: 4,
      max_seats_stay: 2,
      images: ["/images/Rectangle 3463853.png"],
      cities: ["Luxor"],
      location: "Luxor - Egypt",
      rating: 4.2,
      reviewsCount: 12
    },
    {
      id: 5,
      name: "Party Boat",
      price_per_hour: 400,
      max_seats: 12,
      max_seats_stay: 6,
      images: ["/images/Rectangle 3463855.png"],
      cities: ["Cairo"],
      location: "Cairo - Egypt",
      rating: 4.9,
      reviewsCount: 45
    },
    {
      id: 6,
      name: "Family Boat",
      price_per_hour: 250,
      max_seats: 6,
      max_seats_stay: 3,
      images: ["/images/Rectangle 3463856.png"],
      cities: ["Alexandria"],
      location: "Alexandria - Egypt",
      rating: 4.6,
      reviewsCount: 28
    }
  ];

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
          {boats.map((boat, index: number) => {
            return (
              <BoatCard
                key={boat.id || index}
                imageUrl={boat.images?.[0] || '/images/Rectangle 3463853.png'}
                name={boat.name || 'Boat'}
                price={`${boat.price_per_hour || 0}`}
                location={boat.cities?.[0] || boat.location || 'Aswan- Egypt'}
                guests={boat.max_seats || 4}
                status="available"
                rooms={boat.max_seats_stay || 2}
                rating={boat.rating || 5}
                reviewsCount={boat.reviewsCount || 0}
              />
            );
          })}
        </div>

        {/* View All Boats Button */}
        <div className="text-center px-4">
          <Link href="/boats" className="w-full max-w-md sm:w-auto sm:min-w-[280px] h-12 px-8 py-2.5 bg-[#0C4A8C] rounded-lg text-white text-base font-normal font-poppins capitalize hover:bg-[#0A3D7A] transition-colors inline-flex justify-center items-center">
            View All Boats
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BoatFleet;