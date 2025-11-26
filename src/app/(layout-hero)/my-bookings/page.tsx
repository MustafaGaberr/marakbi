"use client";

import { useState } from "react";
import Image from "next/image";

interface Booking {
  id: number;
  boatName: string;
  location: string;
  passengers: number;
  duration: string;
  date: {
    day: string;
    month: string;
    dayOfWeek: string;
  };
  time: string;
  pricePerHour: number;
  image: string;
  imageCount: number;
  status: "ongoing" | "past";
}

// Sample booking data
const sampleBookings: Booking[] = [
  {
    id: 1,
    boatName: "Blue Nile Felucca",
    location: "Aswan- Cataract Ferry Boat",
    passengers: 15,
    duration: "10 Days 22 Hours",
    date: {
      day: "18",
      month: "Sep",
      dayOfWeek: "Tue",
    },
    time: "10:00 AM",
    pricePerHour: 120,
    image: "/images/Rectangle 3463853.png",
    imageCount: 35,
    status: "past",
  },
  {
    id: 2,
    boatName: "Blue Nile Felucca",
    location: "Aswan- Cataract Ferry Boat",
    passengers: 15,
    duration: "10 Days 22 Hours",
    date: {
      day: "18",
      month: "Sep",
      dayOfWeek: "Tue",
    },
    time: "10:00 AM",
    pricePerHour: 120,
    image: "/images/Rectangle 3463853.png",
    imageCount: 35,
    status: "past",
  },
  {
    id: 3,
    boatName: "Blue Nile Felucca",
    location: "Aswan- Cataract Ferry Boat",
    passengers: 15,
    duration: "10 Days 22 Hours",
    date: {
      day: "18",
      month: "Sep",
      dayOfWeek: "Tue",
    },
    time: "10:00 AM",
    pricePerHour: 120,
    image: "/images/Rectangle 3463853.png",
    imageCount: 35,
    status: "past",
  },
  {
    id: 4,
    boatName: "Blue Nile Felucca",
    location: "Aswan- Cataract Ferry Boat",
    passengers: 15,
    duration: "10 Days 22 Hours",
    date: {
      day: "18",
      month: "Sep",
      dayOfWeek: "Tue",
    },
    time: "10:00 AM",
    pricePerHour: 120,
    image: "/images/Rectangle 3463853.png",
    imageCount: 35,
    status: "past",
  },
  // Ongoing bookings
  {
    id: 5,
    boatName: "Luxury Yacht",
    location: "Hurghada - Marina",
    passengers: 8,
    duration: "4 Days 12 Hours",
    date: {
      day: "28",
      month: "Nov",
      dayOfWeek: "Thu",
    },
    time: "2:00 PM",
    pricePerHour: 650,
    image: "/images/Rectangle 3463855.png",
    imageCount: 42,
    status: "ongoing",
  },
  {
    id: 6,
    boatName: "Speed Boat Adventure",
    location: "Sharm El Sheikh",
    passengers: 4,
    duration: "2 Days 6 Hours",
    date: {
      day: "30",
      month: "Nov",
      dayOfWeek: "Sat",
    },
    time: "9:00 AM",
    pricePerHour: 320,
    image: "/images/Rectangle 3463856.png",
    imageCount: 28,
    status: "ongoing",
  },
];

interface BookingCardProps {
  booking: Booking;
}

function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden w-[427px] h-[394px]" style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.1)" }}>
      {/* Boat Image */}
      <div className="relative w-full h-[240px] rounded-t-[10px] overflow-hidden">
        <Image
          src={booking.image}
          alt={booking.boatName}
          fill
          className="object-cover"
        />
        {/* Image count badge */}
        <div className="absolute bottom-[38px] right-[12px] h-8 rounded-md px-2 py-1 flex items-center gap-1" style={{ backgroundColor: "rgba(34, 33, 33, 0.07)", backdropFilter: "blur(2px)" }}>
        <Image
          src="/icons/photo_library_24px.svg"
          alt="Image Count"
          width={24}
          height={24}
        />
          <span className="text-white text-sm font-medium">
            1/{booking.imageCount}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-2 pt-4 pb-2 relative h-[154px]">
        {/* Left Side - Boat Details */}
        <div className="flex flex-col gap-3 w-[280px]">
          <h3 className="text-lg font-medium text-black font-poppins tracking-[0.38px] leading-6">
            {booking.boatName}
          </h3>

          <div className="flex flex-col gap-1.5">
            {/* Location */}
            <div className="flex items-center gap-[3px]">
              <Image
                src="/icons/distance.svg"
                alt="Location"
                width={24}
                height={24}
              />
              <span className="text-sm text-[#989898] capitalize font-inter font-normal whitespace-nowrap">
                {booking.location}
              </span>
            </div>

            {/* Passengers */}
            <div className="flex items-center gap-[3px]">
              <Image
                src="/icons/people-svgrepo-com (1) 2.svg"
                alt="Passengers"
                width={24}
                height={24}
              />
              <span className="text-sm text-[#989898] capitalize font-inter font-normal">
                {booking.passengers} Passenger
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-[3px]">
              <span className="text-sm text-[#989898] capitalize font-inter font-normal">
                {booking.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Date and Price */}
        <div className="absolute right-2 top-4 flex flex-col items-end gap-1 w-[92px]">
          {/* Date Card */}
          <div className="bg-white rounded-lg p-1 flex flex-col items-center justify-center w-full h-[84px]" style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.35)" }}>
            <div className="text-center flex flex-col items-center gap-1">
              <p className="text-[40px] font-bold text-[#106BD8] leading-[0.78] font-poppins">
                {booking.date.day}
              </p>
              <p className="text-sm font-normal font-poppins leading-5">
                <span className="text-[#106BD8]">{booking.date.dayOfWeek}</span>
                <span className="text-[#8A8A8F]"> {booking.date.month}</span>
              </p>
            </div>
            <p className="text-sm text-[#989898] capitalize font-inter font-normal">
              {booking.time}
            </p>
          </div>

          {/* Price */}
          <p className="text-sm font-medium text-[#106BD8] font-inter tracking-[0.38px] leading-6">
            {booking.pricePerHour}EGP/hour
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<"ongoing" | "past">("past");

  const filteredBookings = sampleBookings.filter(
    (booking) => booking.status === activeTab
  );

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Tabs */}
        <div className="flex items-center">
          {/* Ongoing Bookings Tab */}
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`flex items-center gap-2 px-[30px] py-3 transition-all ${
              activeTab === "ongoing"
                ? "border-b-4 border-[#106BD8]"
                : "border-b-0"
            }`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 11.3333V6.66667C28 5.2 26.8 4 25.3333 4H6.66667C5.2 4 4 5.2 4 6.66667V11.3333C5.46667 11.3333 6.66667 12.5333 6.66667 14C6.66667 15.4667 5.46667 16.6667 4 16.6667V21.3333C4 22.8 5.2 24 6.66667 24H25.3333C26.8 24 28 22.8 28 21.3333V16.6667C26.5333 16.6667 25.3333 15.4667 25.3333 14C25.3333 12.5333 26.5333 11.3333 28 11.3333Z"
                stroke={activeTab === "ongoing" ? "#106BD8" : "#8C8C8C"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`text-2xl font-medium font-barlow leading-6 tracking-[-0.4084px] ${
                activeTab === "ongoing" ? "text-[#106BD8]" : "text-[#8C8C8C]"
              }`}
            >
              Ongoing Bookings
            </span>
          </button>

          {/* Past Booking Tab */}
          <button
            onClick={() => setActiveTab("past")}
            className={`flex items-center justify-center gap-2 pl-10 pr-9 py-3 transition-all ${
              activeTab === "past"
                ? "border-b-4 border-[#106BD8]"
                : "border-b-0"
            }`}
          >
            <Image
              src="/icons/gift2.svg"
              alt="Past Booking"
              width={32}
              height={32}
            />
            <span
              className={`text-center justify-start text-2xl font-medium font-barlow leading-6 ${
                activeTab === "past" ? "text-blue-600" : "text-[#8C8C8C]"
              }`}
            >
              Past Booking
            </span>
          </button>
        </div>
      </div>

      {/* Horizontal line separator - Full width */}
      <div className="w-full h-px bg-gray-900 mb-[52px]"></div>

      <div className="max-w-[1440px] mx-auto px-8">م
        {/* Bookings Grid */}
        <div className="flex flex-wrap gap-4">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 font-poppins">
              No {activeTab} bookings found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

