"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { clientApi, BoatDetails as ApiBoatDetails } from "@/lib/api";

export default function BoatDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [boatData, setBoatData] = useState<ApiBoatDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [guestCount, setGuestCount] = useState(2);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [rentalType, setRentalType] = useState<'hourly' | 'daily'>('hourly');

  useEffect(() => {
    const fetchBoatDetails = async () => {
      try {
        setLoading(true);
        const response = await clientApi.getBoatById(parseInt(params.id as string));
        if (response.success && response.data) {
          setBoatData(response.data);
        }
      } catch (error) {
        console.error('Error fetching boat details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchBoatDetails();
    }
  }, [params.id]);

  const handleRequestToBook = () => {
    if (!boatData) return;
    
    // حفظ بيانات الحجز في localStorage
    const bookingData = {
      boat_id: boatData.boat.id,
      boat_name: boatData.boat.name,
      boat_image: boatData.boat.images[0],
      price_per_hour: boatData.boat.price_per_hour,
      price_per_day: boatData.boat.price_per_day || boatData.boat.price_per_hour * 8,
      guest_count: guestCount,
      rental_type: rentalType,
      max_seats: boatData.boat.max_seats
    };
    
    localStorage.setItem('booking_data', JSON.stringify(bookingData));
    router.push('/payment');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center font-poppins">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading boat details...</p>
      </div>
    );
  }

  if (!boatData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center font-poppins">
        <h1 className="text-3xl font-bold mb-4">Boat not found</h1>
        <p className="text-gray-600">The boat you're looking for doesn't exist.</p>
      </div>
    );
  }

  const { boat, owner, reviews, reviews_summary } = boatData;
  const totalRating = reviews_summary.total_reviews;

  return (
    <div className="bg-white">
      {/* Owner & Trip Title Section */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={owner.avatar_url || "/icons/character-3.svg"}
            alt={owner.username}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-lg">{owner.username}</p>
            <p className="text-sm text-gray-600">Boat Owner</p>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 font-poppins">
          {boat.name}
        </h1>
      </div>

      {/* Main Layout: Left Content + Right Sidebar */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content - Gallery + Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div>
              <div className="grid grid-cols-4 gap-2 h-[400px]">
                {boat.images.length > 0 ? (
                  <>
                    <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden">
                      <Image
                        src={boat.images[0]}
                        alt="Main boat"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {boat.images.slice(1, 5).map((img, idx) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden">
                        <Image
                          src={img}
                          alt={`Gallery ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                        {idx === 3 && boat.images.length > 5 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-3xl font-semibold">
                              +{boat.images.length - 5}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="col-span-4 flex items-center justify-center bg-gray-200 rounded-lg">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Image
                      key={i}
                      src="/icons/Star Icon.svg"
                      alt="Star"
                      width={20}
                      height={20}
                      className={`${i < Math.floor(reviews_summary.average_rating) ? "opacity-100" : "opacity-30"}`}
                    />
                  ))}
                </div>
                <span className="font-medium">{reviews_summary.average_rating.toFixed(1)}</span>
                <span className="text-gray-600">({reviews_summary.total_reviews})</span>
                <span className="mx-2">•</span>
                <span className="text-gray-700">{boat.categories.join(', ')}</span>
              </div>
            </div>
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-poppins">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{boat.description}</p>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-poppins">Specifications</h2>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700 mb-1 sm:mb-0">Maximum Capacity</span>
                  <span className="text-gray-600 sm:text-right">{boat.max_seats} Guests</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700 mb-1 sm:mb-0">Sleeping Capacity</span>
                  <span className="text-gray-600 sm:text-right">{boat.max_seats_stay} Guests</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700 mb-1 sm:mb-0">Price Per Hour</span>
                  <span className="text-gray-600 sm:text-right">{boat.price_per_hour} EGP</span>
                </div>
                {boat.price_per_day && (
                  <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-700 mb-1 sm:mb-0">Price Per Day</span>
                    <span className="text-gray-600 sm:text-right">{boat.price_per_day} EGP</span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700 mb-1 sm:mb-0">Categories</span>
                  <span className="text-gray-600 sm:text-right">{boat.categories.join(', ')}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700 mb-1 sm:mb-0">Owner</span>
                  <span className="text-gray-600 sm:text-right">{owner.username}</span>
                </div>
              </div>
            </section>


            {/* Meet Your Captain */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-poppins">Meet Your Captain</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Image
                    src={owner.avatar_url || "/icons/character-3.svg"}
                    alt={owner.username}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-semibold font-poppins">
                      {owner.username}
                    </h3>
                    <p className="text-orange-600 text-sm mb-2">
                      Member since {new Date(owner.member_since).getFullYear()}
                    </p>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Image
                          key={i}
                          src="/icons/Star Icon.svg"
                          alt="Star"
                          width={16}
                          height={16}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{owner.bio || 'No bio available.'}</p>
                <div className="space-y-2 mb-4">
                  {owner.phone && (
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/phone_in_talk_y.svg"
                        alt="Phone"
                        width={20}
                        height={20}
                      />
                      <span className="text-sm">Phone: {owner.phone}</span>
                    </div>
                  )}
                  {owner.address && (
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/location_on.svg"
                        alt="Address"
                        width={20}
                        height={20}
                      />
                      <span className="text-sm">Address: {owner.address}</span>
                    </div>
                  )}
                </div>
                <button className="w-full sm:w-auto px-8 py-3 bg-[#0C4A8C] text-white rounded-lg hover:bg-[#0A3D7A] transition-colors">
                  Contact Owner
                </button>
              </div>
            </section>

            {/* Pricing options */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-poppins">Pricing Options</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Per Hour Rental</p>
                  <p className="text-gray-600">From {boat.price_per_hour} EGP</p>
                </div>
                {boat.price_per_day && (
                  <div>
                    <p className="font-semibold">Per Day Rental</p>
                    <p className="text-gray-600">From {boat.price_per_day} EGP</p>
                  </div>
                )}
              </div>
            </section>

            {/* Customer reviews */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 font-poppins">Customer Reviews</h2>
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Rating Summary */}
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">{reviews_summary.average_rating.toFixed(1)}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Image
                        key={i}
                        src="/icons/Star Icon.svg"
                        alt="Star"
                        width={32}
                        height={32}
                        className={`${i < Math.floor(reviews_summary.average_rating) ? "opacity-100" : "opacity-30"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    Based on {totalRating} Reviews
                  </p>
                </div>

                {/* Rating Breakdown */}
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = reviews_summary.star_breakdown[`${stars}_stars` as keyof typeof reviews_summary.star_breakdown] || 0;
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="w-16 text-sm">{stars} Star</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-400"
                            style={{
                              width: totalRating > 0 ? `${(count / totalRating) * 100}%` : '0%',
                            }}
                          />
                        </div>
                        <span className="w-12 text-right text-sm">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No reviews yet.</p>
                ) : (
                  (showAllReviews ? reviews : reviews.slice(0, 3)).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-semibold">
                          {review.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">{review.username}</p>
                          <p className="text-sm text-gray-600">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Image
                            key={i}
                            src="/icons/Star Icon.svg"
                            alt="Star"
                            width={16}
                            height={16}
                            className={`${i < review.rating ? "opacity-100" : "opacity-30"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {reviews.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="mt-6 px-8 py-3 border-2 border-[#0C4A8C] text-[#0C4A8C] rounded-lg hover:bg-[#0C4A8C] hover:text-white transition-colors"
                >
                  {showAllReviews ? "Show Less" : "Show All Comments"}
                </button>
              )}
            </section>
          </div>

          {/* Right Sidebar - Pricing (Sticky) */}
          <div className="lg:col-span-1">
            <div className=" top-20 bg-white rounded-lg border border-stone-300 p-4 shadow-lg z-10">
              {/* Pricing Tabs */}
              <div className="flex justify-start items-center gap-1 mb-6">
                <button 
                  onClick={() => setRentalType('hourly')}
                  className={`w-24 h-10 p-2.5 rounded-lg flex justify-center items-center gap-2.5 ${rentalType === 'hourly' ? 'bg-sky-800' : 'border border-zinc-400 hover:bg-gray-50'}`}
                >
                  <span className={`text-xs font-normal font-poppins ${rentalType === 'hourly' ? 'text-white' : 'text-zinc-500'}`}>
                    Per Hour
                  </span>
                </button>
                <button 
                  onClick={() => setRentalType('daily')}
                  className={`w-24 h-10 p-2.5 rounded-lg flex justify-center items-center gap-2.5 ${rentalType === 'daily' ? 'bg-sky-800' : 'border border-zinc-400 hover:bg-gray-50'}`}
                >
                  <span className={`text-xs font-normal font-poppins ${rentalType === 'daily' ? 'text-white' : 'text-zinc-500'}`}>
                    Per Day
                  </span>
                </button>
              </div>

              {/* Pricing Header */}
              <div className="flex justify-start items-center gap-12 mb-6">
                <h3 className="text-black text-2xl font-medium font-poppins">
                  Pricing
                </h3>
                <div>
                  <span className="text-blue-700 text-2xl font-medium font-poppins">
                    {rentalType === 'hourly' ? boat.price_per_hour : (boat.price_per_day || boat.price_per_hour * 8)}
                  </span>
                  <span className="text-black text-base font-medium font-poppins">
                    {" "}
                    EGP/{rentalType === 'hourly' ? 'Hour' : 'Day'}
                  </span>
                </div>
              </div>

              {/* Calendar */}
              <div className="flex flex-col justify-start items-center gap-4 mb-6">
                <div className="self-stretch flex justify-between items-center">
                  <div className="w-6 h-6 bg-gray-100 rounded"></div>
                  <h4 className="text-zinc-900 text-sm font-semibold font-poppins leading-4">
                    December 2025
                  </h4>
                  <div className="w-6 h-6 bg-gray-100 rounded"></div>
                </div>

                <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                  {/* Day Headers */}
                  <div className="w-full flex justify-between items-center">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                      <div
                        key={day}
                        className="w-7 p-1.5 rounded flex flex-col justify-center items-center gap-1.5"
                      >
                        <div className="text-center text-gray-500 text-sm font-medium font-poppins leading-4">
                          {day}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="w-full flex justify-start items-center gap-2.5 flex-wrap">
                    <div className="w-7 p-1.5 rounded flex flex-col justify-center items-center gap-1.5">
                      <div className="text-center text-gray-500 text-sm font-medium font-poppins leading-4">
                        31
                      </div>
                    </div>
                    {[...Array(17)].map((_, i) => (
                      <div
                        key={i}
                        className="w-7 p-1.5 rounded flex flex-col justify-center items-center gap-1.5 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="text-center text-zinc-900 text-sm font-medium font-poppins leading-4">
                          {i + 1}
                        </div>
                      </div>
                    ))}
                    <div className="w-7 p-1.5 bg-gray-200 rounded flex flex-col justify-center items-center gap-1.5">
                      <div className="text-center text-zinc-900 text-sm font-medium font-poppins leading-4">
                        18
                      </div>
                    </div>
                    <div className="w-7 p-1.5 bg-blue-700 rounded flex flex-col justify-center items-center gap-1.5">
                      <div className="text-center text-white text-[10.13px] font-semibold font-poppins leading-4">
                        19
                      </div>
                    </div>
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i + 20}
                        className="w-7 p-1.5 rounded flex flex-col justify-center items-center gap-1.5 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="text-center text-zinc-900 text-sm font-medium font-poppins leading-4">
                          {i + 20}
                        </div>
                      </div>
                    ))}
                    {[1, 2, 3].map((day) => (
                      <div
                        key={`next-${day}`}
                        className="w-7 p-1.5 rounded flex flex-col justify-center items-center gap-1.5"
                      >
                        <div className="text-center text-gray-500 text-sm font-medium font-poppins leading-4">
                          {day}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Number of guests */}
              <div className="flex flex-col justify-start items-start gap-2 mb-6">
                <div className="self-stretch h-6 flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-gray-500"
                  >
                    <path
                      d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z"
                      stroke="currentColor"
                      strokeWidth="1.33"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.5 14C13.5 11.5147 11.0899 9.5 8 9.5C4.91015 9.5 2.5 11.5147 2.5 14"
                      stroke="currentColor"
                      strokeWidth="1.33"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <label className="text-gray-500 text-base font-normal font-poppins leading-6">
                    Number of guests
                  </label>
                </div>
                <div className="self-stretch h-14 px-3 rounded-[10px] border border-black/10 flex justify-between items-center">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-8 h-8 px-3 rounded-lg flex justify-center items-center gap-1.5"
                  >
                    <span className="text-neutral-950 text-sm font-medium font-poppins leading-5">
                      -
                    </span>
                  </button>
                  <span className="text-neutral-950 text-base font-normal font-poppins leading-6">
                    {guestCount}
                  </span>
                  <button
                    onClick={() =>
                      setGuestCount(Math.min(boat.max_seats, guestCount + 1))
                    }
                    className="w-8 h-8 px-3 rounded-lg flex justify-center items-center gap-1.5"
                  >
                    <span className="text-neutral-950 text-sm font-medium font-poppins leading-5">
                      +
                    </span>
                  </button>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="flex flex-col justify-start items-start gap-2 mb-6">
                <div className="self-stretch h-6 flex justify-between items-start">
                  <span className="text-gray-500 text-base font-normal font-poppins leading-6">
                    $650 x 6 days
                  </span>
                  <span className="text-neutral-950 text-base font-normal font-poppins leading-6">
                    $4800
                  </span>
                </div>
                <div className="self-stretch h-6 flex justify-between items-start">
                  <span className="text-gray-500 text-base font-normal font-poppins leading-6">
                    Service fee
                  </span>
                  <span className="text-neutral-950 text-base font-normal font-poppins leading-6">
                    $480
                  </span>
                </div>
                <div className="self-stretch h-px bg-black/10"></div>
                <div className="self-stretch h-6 flex justify-between items-start">
                  <span className="text-neutral-950 text-base font-normal font-poppins leading-6">
                    Total
                  </span>
                  <span className="text-neutral-950 text-base font-normal font-poppins leading-6">
                    $5280
                  </span>
                </div>
              </div>

              {/* Request to Book Button */}
              <button 
                onClick={handleRequestToBook}
                className="w-full h-10 px-3.5 py-1.5 bg-sky-900 rounded flex justify-center items-center gap-1 mb-3 hover:bg-sky-800 transition-colors"
              >
                <span className="text-center text-white text-base font-semibold font-poppins leading-6">
                  Request to Book
                </span>
              </button>

              {/* Info Message */}
              <div className="flex items-start gap-2">
                <Image
                  src="/icons/whiteShield.svg"
                  alt="Safety Info"
                  width={20}
                  height={20}
                  className="mt-1"
                />
                <p className="text-gray-500 text-base font-normal font-poppins leading-6">
                  You won't be charged yet. The host will review your request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
