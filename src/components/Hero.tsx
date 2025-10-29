"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [city, setCity] = useState('');
  const [boatType, setBoatType] = useState('');
  const [tripType, setTripType] = useState('');
  // Dummy data for cities
  const cities = [
    { id: 1, name: 'Aswan' },
    { id: 2, name: 'Luxor' },
    { id: 3, name: 'Cairo' },
    { id: 4, name: 'Alexandria' },
    { id: 5, name: 'Hurghada' },
    { id: 6, name: 'Sharm El Sheikh' }
  ];

  // Dummy data for boats
  const boats = [
    { id: 1, name: 'Traditional Felucca' },
    { id: 2, name: 'Luxury Yacht' },
    { id: 3, name: 'Speed Boat' },
    { id: 4, name: 'Fishing Boat' },
    { id: 5, name: 'Party Boat' },
    { id: 6, name: 'Family Boat' }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Background images that correspond to the featured activities
  const backgroundImages = [
    "/images/Rectangle 3463841.png", // Felucca background
    "/images/Rectangle 3463845.png", // Fishing background  
    "/images/Rectangle 3463846.png"  // Kayak background
  ];

  // Timer for image gallery animation - slower (5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Function to handle manual image selection
  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <section className="relative w-full h-auto sm:h-240 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImages[activeImageIndex]}
          alt="Hero Background"
          fill
          className="object-cover transition-all duration-1000 ease-in-out"
          priority
          quality={90}
        />
      </div>

      {/* Content */}
      <div className="relative w-full h-auto sm:h-200 flex items-start sm:items-center px-0 sm:px-4 pt-30 pb-8 sm:pt-0 sm:pb-0">
        <div className="w-full px-4 sm:px-8 md:px-16 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 sm:gap-8 lg:gap-32">
          {/* Left Side: Text Content */}
          <div className="flex flex-col text-left w-full lg:w-auto">
            <div className="text-orange-300 text-3xl sm:text-3xl lg:text-4xl font-normal font-['SignPainter'] capitalize leading-tight">
              With Marakbi
            </div>
            <div className="text-white text-2xl sm:text-2xl lg:text-3xl font-medium font-poppins capitalize mb-4 sm:mb-6">
              Your Dream Boats
            </div>
            <div className="text-white text-3xl sm:text-4xl lg:text-6xl font-bold font-poppins capitalize leading-tight sm:leading-tight lg:leading-[68px] mb-6 sm:mb-12 lg:mb-16">
              <span className="text-white">Most Reliable<br/></span>
              <span className="text-white">Luxury Boats </span>
              <span className="text-orange-300">Rentals</span>
            </div>
            <button className="hidden sm:flex w-56 h-12 px-6 py-2.5 bg-[#0C4A8C] rounded-lg justify-center items-center gap-2.5 text-white text-base font-normal font-poppins mx-auto lg:mx-0 clickable hover:bg-[#0A3D7A] transition-colors">
              Explore Now
            </button>
          </div>

          {/* Right Side: Booking Form */}
          <div className="w-full sm:w-80 bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col justify-start items-center p-5 sm:p-6 shadow-2xl border border-white/30 space-y-3 sm:space-y-4">

            {/* City Dropdown */}
            <div className="w-full">
              <p className="text-white text-sm sm:text-base font-normal font-poppins mb-2">Where To Go</p>
              <select 
                className="w-full h-11 sm:h-12 p-3 bg-white/30 backdrop-blur-sm rounded-lg text-gray-700 text-sm font-normal font-poppins capitalize border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">City</option>
                {cities.map((cityOption) => (
                  <option key={cityOption.id} value={cityOption.id}>
                    {cityOption.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Boat Type Dropdown */}
            <div className="w-full">
              <p className="text-white text-sm sm:text-base font-normal font-poppins mb-2">Boat Type</p>
              <select 
                className="w-full h-11 sm:h-12 p-3 bg-white/30 backdrop-blur-sm rounded-lg text-gray-700 text-sm font-normal font-poppins capitalize border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={boatType}
                onChange={(e) => setBoatType(e.target.value)}
              >
                <option value="">Felucca</option>
                {boats.map((boat, index) => {
                  const boatData = boat as { id?: number; name?: string };
                  return (
                    <option key={boatData.id || index} value={boatData.id}>
                      {boatData.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Trip Type Dropdown */}
            <div className="w-full">
              <p className="text-white text-sm sm:text-base font-normal font-poppins mb-2">Trip Type</p>
              <select 
                className="w-full h-11 sm:h-12 p-3 bg-white/30 backdrop-blur-sm rounded-lg text-gray-700 text-sm font-normal font-poppins capitalize border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
              >
                <option value="">Per Hour</option>
                <option value="per_hour">Per Hour</option>
                <option value="half_day">Half Day</option>
                <option value="full_day">Full Day</option>
                <option value="multi_day">Multi Day</option>
              </select>
            </div>

            {/* Book now Button */}
            <button className="w-full h-11 sm:h-12 px-6 py-2.5 bg-[#0C4A8C] backdrop-blur-sm rounded-lg flex justify-center items-center gap-2.5 text-white text-base font-medium font-poppins clickable hover:bg-[#0A3D7A] transition-all duration-300 shadow-lg mt-2 sm:mt-4">
              Book now
            </button>
          </div>
        </div>
      </div>

      {/* Featured Activities Section - Hidden on Mobile */}
      <div className="hidden sm:block absolute bottom-0 left-1/2 transform -translate-x-1/2 max-w-5xl w-[600px] px-4">
        <div className="bg-white rounded-tl-lg rounded-tr-lg shadow-lg">
          <div className="p-4 min-h-[200px] overflow-hidden">
            <h2 className="text-blue-700 text-lg font-medium font-poppins capitalize mb-4">
              Featured Activities
            </h2>

            {/* Image Gallery */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 h-40">
              {/* Image 1: Felucca */}
              <div 
                className="relative transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
                onClick={() => handleImageClick(0)}
              >
                <Image
                  src="/images/f1.png"
                  alt="Felucca"
                  width={176}
                  height={160}
                  className={`rounded-lg transition-all duration-500 ease-in-out ${
                    activeImageIndex === 0
                      ? 'w-44 h-40 scale-105'
                      : 'w-40 h-36'
                  }`}
                  quality={85}
                />
                <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white text-lg font-medium font-poppins">
                  01
                </div>
              </div>

              {/* Image 2: Fishing */}
              <div 
                className="relative transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
                onClick={() => handleImageClick(1)}
              >
                <Image
                  src="/images/f2.png"
                  alt="Fishing"
                  width={176}
                  height={160}
                  className={`rounded-lg transition-all duration-500 ease-in-out ${
                    activeImageIndex === 1 
                      ? 'w-44 h-40 scale-105' 
                      : 'w-40 h-36'
                  }`}
                  quality={85}
                />
                <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white text-lg font-medium font-poppins">
                  02
                </div>
              </div>

              {/* Image 3: Kayak */}
              <div 
                className="relative transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
                onClick={() => handleImageClick(2)}
              >
                <Image
                  src="/images/f3.png"
                  alt="Kayak"
                  width={176}
                  height={160}
                  className={`rounded-lg transition-all duration-500 ease-in-out ${
                    activeImageIndex === 2 
                      ? 'w-44 h-40 scale-105' 
                      : 'w-40 h-36'
                  }`}
                  quality={85}
                />
                <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white text-lg font-medium font-poppins">
                  03
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;