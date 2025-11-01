"use client";

import { useParams } from "next/navigation";
import { getBoatById } from "@/data/boats";
import Image from "next/image";
import { useState } from "react";

export default function BoatDetailsPage() {
  const params = useParams();
  const boat = getBoatById(params.id as string);
  const [guestCount, setGuestCount] = useState(2);
  const [showAllReviews, setShowAllReviews] = useState(false);

  if (!boat) {
    return (
      <div className="container mx-auto px-4 py-20 text-center font-poppins">
        <h1 className="text-3xl font-bold mb-4">Boat not found</h1>
        <p className="text-gray-600">The boat you're looking for doesn't exist.</p>
      </div>
    );
  }

  const { details } = boat;
  const totalRating = details.ratingBreakdown.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="bg-white">
      {/* Owner & Trip Title Section */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={details.owner.avatar}
            alt={details.owner.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-lg">{details.owner.name}</p>
            <p className="text-sm text-gray-600">{details.owner.role}</p>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 font-poppins">
          {boat.tripTitle}
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
                <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden">
                  <Image
                    src={details.gallery[0]}
                    alt="Main boat"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={details.gallery[1]}
                    alt="Gallery 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={details.gallery[2]}
                    alt="Gallery 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={details.gallery[3]}
                    alt="Gallery 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={details.gallery[4]}
                    alt="Gallery 4"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-3xl font-semibold">
                      +{details.galleryExtraCount}
                    </span>
                  </div>
                </div>
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
                      className={`${i < Math.floor(boat.rating) ? "opacity-100" : "opacity-30"}`}
                    />
                  ))}
                </div>
                <span className="font-medium">{boat.rating}</span>
                <span className="text-gray-600">({boat.reviewsCount})</span>
                <span className="mx-2">•</span>
                <span className="text-gray-700">{boat.location}</span>
                <span className="mx-2">•</span>
                <span className="text-sm text-gray-600">{details.recommendedLabel}</span>
              </div>
            </div>
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-poppins">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{details.overview}</p>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-poppins">Specifications</h2>
              <div className="space-y-3">
                {details.specifications.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200"
                  >
                    <span className="font-medium text-gray-700 mb-1 sm:mb-0">
                      {spec.label}
                    </span>
                    <span className="text-gray-600 sm:text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Trip Details */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-poppins">Trip Details</h2>
              <h3 className="text-xl font-semibold mb-3 font-poppins">
                {details.tripDetails.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {details.tripDetails.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {details.tripDetails.stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <span className="font-medium text-gray-800">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Meet Your Captain */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-poppins">Meet Your Captain</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Image
                    src={details.owner.avatar}
                    alt={details.owner.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-semibold font-poppins">
                      {details.owner.name}
                    </h3>
                    <p className="text-orange-600 text-sm mb-2">
                      {details.owner.experience}
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
                <p className="text-gray-700 mb-4">{details.owner.bio}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/groups_2.svg"
                      alt="Languages"
                      width={20}
                      height={20}
                    />
                    <span className="text-sm">
                      Languages spoken: {details.owner.languages.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/phone_in_talk_y.svg"
                      alt="Response"
                      width={20}
                      height={20}
                    />
                    <span className="text-sm">
                      Response time: {details.owner.responseTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/thumb_up.svg"
                      alt="Rate"
                      width={20}
                      height={20}
                    />
                    <span className="text-sm">
                      Response rate: {details.owner.responseRate}
                    </span>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-8 py-3 bg-[#0C4A8C] text-white rounded-lg hover:bg-[#0A3D7A] transition-colors">
                  Contact Owner
                </button>
              </div>
            </section>

            {/* Good to know */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-poppins">Good to know</h2>
              <ul className="space-y-2">
                {details.goodToKnow.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gray-700">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Withdrawal and cancellation policy */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-poppins">
                Withdrawal and cancellation policy
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1 font-poppins">Cancellation policy</h3>
                  <p className="text-gray-700">
                    {details.cancellationPolicy.cancellation}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 font-poppins">Change Policy.</h3>
                  <p className="text-gray-700">
                    {details.cancellationPolicy.change}
                  </p>
                </div>
              </div>
            </section>

            {/* Pricing options */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-poppins">Pricing options</h2>
              <div className="space-y-3">
                {details.pricingOptions.map((option, idx) => (
                  <div key={idx}>
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-gray-600">{option.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Customer reviews */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 font-poppins">Customer reviews</h2>
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Rating Summary */}
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">{boat.rating}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Image
                        key={i}
                        src="/icons/Star Icon.svg"
                        alt="Star"
                        width={32}
                        height={32}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    Based on {totalRating} Review
                  </p>
                </div>

                {/* Rating Breakdown */}
                <div className="flex-1 space-y-2">
                  {details.ratingBreakdown.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <span className="w-16 text-sm">{item.stars} Star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-400"
                          style={{
                            width: `${(item.count / totalRating) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="w-12 text-right text-sm">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {(showAllReviews
                  ? details.reviews
                  : details.reviews.slice(0, 3)
                ).map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-semibold">
                        {review.reviewer.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{review.reviewer}</p>
                        <p className="text-sm text-gray-600">{review.date}</p>
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
                    {review.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        {review.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative h-24 rounded-lg overflow-hidden"
                          >
                            <Image
                              src={img}
                              alt={`Review ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {details.reviews.length > 3 && (
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
                <button className="w-24 h-10 p-2.5 bg-sky-800 rounded-lg flex justify-center items-center gap-2.5">
                  <span className="text-white text-xs font-normal font-poppins">
                    Per Hour
                  </span>
                </button>
                <button className="w-24 h-10 p-2.5 rounded-lg border border-zinc-400 flex justify-center items-center gap-2.5 hover:bg-gray-50">
                  <span className="text-zinc-500 text-xs font-normal font-poppins">
                    Per Day
                  </span>
                </button>
                <button className="w-24 h-10 p-2.5 rounded-lg border border-zinc-400 flex justify-center items-center gap-2.5 hover:bg-gray-50">
                  <span className="text-zinc-500 text-xs font-normal font-poppins">
                    Per Week
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
                    {details.pricing.perHour}
                  </span>
                  <span className="text-black text-base font-medium font-poppins">
                    {" "}
                    EGP/Hour
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
              <button className="w-full h-10 px-3.5 py-1.5 bg-sky-900 rounded flex justify-center items-center gap-1 mb-3 hover:bg-sky-800 transition-colors">
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
