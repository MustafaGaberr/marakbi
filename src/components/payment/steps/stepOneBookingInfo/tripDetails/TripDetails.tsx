"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import TripDetailsCell from "./TripDetailsCell";
import TripDetailsCellItem from "./TripDetailsCellItem";
import { MdOutlineGroups2 } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { HiLockOpen } from "react-icons/hi";

export default function TripDetails() {
  const [bookingData, setBookingData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const savedBooking = localStorage.getItem('booking_data');
    if (savedBooking) {
      setBookingData(JSON.parse(savedBooking));
    }
  }, []);

  if (!bookingData) {
    return (
      <div className="border-2 w-full border-[#C0C0C0] rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate duration text
  const getDurationText = () => {
    if (bookingData.rental_type === 'hourly' && bookingData.hours) {
      return `${bookingData.hours} hour${bookingData.hours > 1 ? 's' : ''}`;
    } else if (bookingData.days) {
      return `${bookingData.days} day${bookingData.days > 1 ? 's' : ''}`;
    }
    return 'Duration not specified';
  };

  return (
    <div className="border-2 w-full overflow-hidden border-[#C0C0C0] rounded-lg text-sm sm:text-base">
      {/* === 1. Main Image & Header === */}
      <TripDetailsCell>
        <div className="relative h-[160px] sm:h-[200px] md:h-[240px] overflow-hidden rounded-md">
          <Image
            alt={bookingData.boat_name}
            src={bookingData.boat_image || "/paymentBg.jpg"}
            fill
            className="object-cover"
            priority
          />
        </div>

        <p className="text-[22px] sm:text-[26px] md:text-[28px] mt-3 mb-2 font-semibold leading-tight">
          {bookingData.boat_name}
        </p>

        <div className="flex flex-wrap text-[#CEAF6E] items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <IoStarSharp key={i} size={18} className="sm:size-[20px]" />
            ))}
          </div>
          <IoMdThumbsUp size={22} className="ml-1 sm:ml-2 text-[#CEAF6E]" />
          <div className="flex gap-1 text-[#7D7D7D] text-sm sm:text-base">
            <span>4.5</span>
            <span>(Reviews)</span>
          </div>
        </div>
      </TripDetailsCell>

      {/* === 2. Booking Details === */}
      <TripDetailsCell>
        <div className="flex flex-col gap-3 sm:gap-4">
          <TripDetailsCellItem
            Icon={FaRegClock}
            description={`${formatDate(bookingData.start_date)} - ${getDurationText()}`}
          />
          <TripDetailsCellItem
            Icon={MdOutlineGroups2}
            description={`${bookingData.guest_count} Guest${bookingData.guest_count > 1 ? 's' : ''}`}
          />
        </div>
      </TripDetailsCell>

      {/* === 3. Cancellation Policy === */}
      <TripDetailsCell>
        <TripDetailsCellItem
          Icon={HiLockOpen}
          description="Free cancellation"
          details="Until 24 hours before trip"
        />
      </TripDetailsCell>

      {/* === 4. Total Section === */}
      <TripDetailsCell grayBg>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <p className="text-base sm:text-lg font-semibold">Total</p>
          <div className="text-right sm:text-left">
            <p className="text-lg sm:text-xl mb-0.5 font-semibold">
              {bookingData.total_price?.toFixed(0) || bookingData.base_price?.toFixed(0)} EGP
            </p>
            <p className="text-[#A0A0A0] text-xs sm:text-sm font-normal">
              {bookingData.service_fee && `Including service fee: ${bookingData.service_fee.toFixed(0)} EGP`}
            </p>
          </div>
        </div>
      </TripDetailsCell>
    </div>
  );
}
