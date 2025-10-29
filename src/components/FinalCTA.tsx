const FinalCTA = () => {
  return (
    <section className="hidden md:block relative w-full overflow-hidden">
      {/* Title Above Section */}
      <div className="text-center py-12 bg-white">
        <p className="text-4xl lg:text-5xl font-signpainter mt-8 text-[#927C4E]">
          It&apos;s The Time Book Your Trip
        </p>
      </div>

      {/* Main CTA Section with Background Image */}
      <div className="relative w-full min-h-[600px] flex items-center">
        {/* Background Image - Flipped Horizontally */}
        <img
          src="/images/finalcta.png"
          alt="Boat Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }}
        />

  {/* Blur Layer on Top */}
  <div className="absolute top-0 left-0 w-full h-16 bg-white blur-[31.90px]" />

        {/* Overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black/20"></div> */}

        {/* Content Container */}
        <div className="relative container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <div className="text-sky-950 text-4xl font-bold font-poppins mb-6">
              Book your Dream<br/>Voyage now
            </div>

            {/* Description */}
            <div className="text-sky-100 text-base font-medium font-poppins mb-8 max-w-[464px]">
              Every journey with Marakbi is tailored to perfection. From private charters to bespoke itineraries, our boats and expert captains ensure a seamless, unforgettable experience.
            </div>

            {/* CTA Button */}
            <div className="w-56 h-12 px-6 py-2.5 bg-white rounded-lg inline-flex justify-center items-center gap-2.5">
              <div className="text-sky-800 text-base font-normal font-poppins capitalize">Book now</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;