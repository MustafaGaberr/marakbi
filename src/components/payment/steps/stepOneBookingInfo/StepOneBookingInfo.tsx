"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TripDetails from "./tripDetails/TripDetails";
import useFormStep from "@/hooks/useFormStep";
import Image from "next/image";

export default function StepOneBookingInfo() {
  const router = useRouter();
  const { setStep } = useFormStep();
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Load booking data from localStorage
    const savedBooking = localStorage.getItem('booking_data');
    if (savedBooking) {
      setBookingData(JSON.parse(savedBooking));
    } else {
      // If no booking data, redirect to home
      router.push('/');
    }
  }, [router]);

  if (!bookingData) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-900"></div>
      </div>
    );
  }

  return (
    <div
      className="
        flex flex-col-reverse lg:flex-row 
        justify-between 
        gap-8 md:gap-12 lg:gap-24 xl:gap-32 
        w-full 
        px-4 sm:px-6 lg:px-0
      "
    >
      {/* Left side: Booking details */}
      <div className="w-full lg:w-[60%]">
        <h2 className="text-2xl font-bold mb-6">Booking Information</h2>
        
        {/* Boat Info */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex gap-4">
            {bookingData.boat_image && (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={bookingData.boat_image}
                  alt={bookingData.boat_name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold mb-2">{bookingData.boat_name}</h3>
              <p className="text-gray-600">Rental Type: {bookingData.rental_type}</p>
              <p className="text-gray-600">Guests: {bookingData.guest_count}</p>
              <p className="text-gray-600">Max Capacity: {bookingData.max_seats}</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-4">Price Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {bookingData.rental_type === 'hourly' ? 'Per Hour' : 'Per Day'}
              </span>
              <span className="font-semibold">
                {bookingData.rental_type === 'hourly' ? bookingData.price_per_hour : bookingData.price_per_day} EGP
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep(2)}
          className="mt-6 w-full px-6 py-3 bg-sky-900 text-white rounded-lg hover:bg-sky-800 transition-colors"
        >
          Continue
        </button>
      </div>

      {/* Right side: Trip details */}
      <div className="w-full lg:w-[40%]">
        <TripDetails />
      </div>
    </div>
  );
}
