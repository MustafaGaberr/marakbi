"use client";

import { useState } from 'react';

const WhyChoosingUs = () => {
  const [activeColumn, setActiveColumn] = useState(0);

  const columns = [
    {
      title: "Unmatched Local Expertise",
      image: "/images/Rectangle 3463855.png",
      caption: "We Aren't Just A Rental Service; We Are A Network Of Local Professionals Who Live And Breathe Egypt's Waters. Our Captains Know The Hidden Gems And Secret Spots That Will Make Your Trip Unforgettable."
    },
    {
      title: "Your Safety, Our Priority", 
      image: "/images/Rectangle 3463856.png",
      caption: "Every Single Boat, Captain, And Owner In Our Network Is Thoroughly Vetted. We Are Committed To The Highest Standards Of Safety And Professionalism So You Can Relax And Enjoy The Ride."
    },
    {
      title: "The Full Scope Of Egypt's Waters",
      image: "/images/Rectangle 3463857.png",
      caption: "Whether Your Adventure Is On The Ancient Nile River, The Vibrant Red Sea, Or The Tranquil Mediterranean, Marakbi Is Your Single Point Of Access To The Best Boats And Experiences In All Of Egypt."
    },
    {
      title: "Effortless & Transparent Booking",
      image: "/images/Rectangle 3463858.png",
      caption: "Forget The Hassle Of Searching. Our Platform Provides Clear, Transparent Pricing And A Seamless Booking Process, Putting You On The Water With Just A Few Clicks."
    }
  ];

  return (
    <section className="w-full">
      {/* Header Section */}
      <div className="bg-[#093B77] py-8 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl sm:text-4xl lg:text-[46px] font-bold text-white font-poppins mb-4 capitalize break-words">
            Why Choosing US
          </h2>
          <p className="text-l sm:text-2xl lg:text-[30px] text-white font-poppins mb-8 capitalize break-words font-normal">
            We Do Our Best For Your Convenience
          </p>
          <button className="bg-[#CEAF6E] text-[#093B77] px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-normal font-poppins capitalize break-words hover:bg-[#B8941F] transition-colors w-full max-w-xs sm:w-auto pt-4 mt-4">
            Book With Us
          </button>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden bg-[#093B77] py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {columns.map((column, index) => (
            <div key={index} className="bg-[#072D5B] rounded-2xl overflow-hidden">
              <div className="py-8 px-6">
                <h3 className="text-white text-xl font-semibold font-poppins text-center">
                  {column.title}
                </h3>
              </div>
              
              <div className="relative h-64 w-full">
                <img src={column.image} alt={column.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-6">
                  <p className="text-[#CEAF6E] text-sm font-poppins leading-relaxed text-center">
                    {column.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Main Content Area */}
      <div className="hidden md:block relative w-full h-[100vh] overflow-hidden">
        {/* Background Image */}
        <img
          src={columns[activeColumn].image}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        />

        {/* Columns Overlay */}
        <div className="absolute inset-0 flex">
          {columns.map((column, index) => (
            <div
              key={index}
              className="flex-1 border-r border-white/20 last:border-r-0 cursor-pointer hover:bg-white/10 transition-all duration-300 relative"
              onMouseEnter={() => setActiveColumn(index)}
            >
              <div className="h-full flex flex-col justify-between ">
                <h3 className={`text-lg font-medium font-poppins p-12 text-center rounded transition-all duration-300 ${
                  activeColumn === index 
                    ? 'bg-[#093B77] text-white' 
                    : 'text-white'
                }`}>
                  {column.title}
                </h3>
                {activeColumn === index && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[#CEAF6E] text-sm font-poppins leading-relaxed">
                      {column.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChoosingUs;
