"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      {/* Main Content Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[869px_auto] gap-8 lg:gap-8 xl:gap-12 justify-items-start">
            {/* Left Column - Contact Form */}
            <div className="border border-[#cacaca] rounded-lg p-4 sm:p-6 md:p-8 lg:p-11 h-fit w-full">
              {/* Form Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-poppins font-medium capitalize text-black mb-4 leading-[normal]">
                Contact Form
              </h2>

              {/* Form Description */}
              <p className="text-base sm:text-lg lg:text-[22px] font-poppins font-normal capitalize text-[#616161] mb-8 max-w-[636px] leading-[normal]">
                Ready to reserve your unforgettable water adventure?
                <br />
                Fill out the details below and secure your perfect Marakbi
                experience in just a few clicks
              </p>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {/* First Row - First Name and Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full h-[60px] px-4 py-3 bg-[#f7f7f7] rounded-lg border-none outline-none text-[22px] font-poppins font-normal text-black placeholder:text-black placeholder:opacity-100 focus:ring-2 focus:ring-[#093b77] focus:ring-opacity-20 transition-all"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full h-[60px] px-4 py-3 bg-[#f7f7f7] rounded-lg border-none outline-none text-[22px] font-poppins font-normal text-black placeholder:text-black placeholder:opacity-100 focus:ring-2 focus:ring-[#093b77] focus:ring-opacity-20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Second Row - Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full h-[60px] px-4 py-3 bg-[#f7f7f7] rounded-lg border-none outline-none text-[22px] font-poppins font-normal text-black placeholder:text-black placeholder:opacity-100 focus:ring-2 focus:ring-[#093b77] focus:ring-opacity-20 transition-all"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className="w-full h-[60px] px-4 py-3 bg-[#f7f7f7] rounded-lg border-none outline-none text-[22px] font-poppins font-normal text-black placeholder:text-black placeholder:opacity-100 focus:ring-2 focus:ring-[#093b77] focus:ring-opacity-20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full h-[60px] px-4 py-3 bg-[#f7f7f7] rounded-lg border-none outline-none text-[22px] font-poppins font-normal text-black placeholder:text-black"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={6}
                    className="w-full min-h-[228px] px-4 py-6 bg-[#f7f7f7] rounded-lg border-none outline-none text-[22px] font-poppins font-normal text-black placeholder:text-black placeholder:opacity-100 resize-none focus:ring-2 focus:ring-[#093b77] focus:ring-opacity-20 transition-all"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-orange-300 text-black font-poppins font-medium text-base rounded-lg hover:bg-amber-300 transition-colors mt-6"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Column - Contact Information Cards */}
            <div className="flex flex-col gap-6 max-w-[427px] w-full lg:justify-start">
              {/* Contact Information Card */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-6 shadow-sm">
                <h3 className="text-base font-poppins font-normal text-neutral-950 mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex gap-3 items-start pb-4">
                    <div className="bg-[rgba(3,2,19,0.1)] rounded-[10px] w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/icons/contact-1.svg"
                        alt="Phone"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-poppins font-normal text-[#717182] mb-1 leading-[20px]">
                        Phone
                      </p>
                      <p className="text-base font-poppins font-medium text-neutral-950 mb-1 leading-[24px]">
                        +2010 31 41 6 900
                      </p>
                      <p className="text-xs font-poppins font-normal text-[#717182] leading-[16px]">
                        Mon-Fri 8AM-8PM EST
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-[rgba(0,0,0,0.1)]" />

                  {/* Email */}
                  <div className="flex gap-3 items-start pb-4">
                    <div className="bg-[rgba(3,2,19,0.1)] rounded-[10px] w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/icons/contact-2.svg"
                        alt="Email"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-poppins font-normal text-[#717182] mb-1 leading-[20px]">
                        Email
                      </p>
                      <p className="text-base font-poppins font-medium text-neutral-950 mb-1 leading-[24px]">
                        info@marakbi.tours
                      </p>
                      <p className="text-xs font-poppins font-normal text-[#717182] leading-[16px]">
                        We&apos;ll respond within 24hrs
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-[rgba(0,0,0,0.1)]" />

                  {/* Office */}
                  <div className="flex gap-3 items-start pb-4">
                    <div className="bg-[rgba(3,2,19,0.1)] rounded-[10px] w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/icons/contact-3.svg"
                        alt="Location"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-poppins font-normal text-[#717182] mb-1 leading-[20px]">
                        Office
                      </p>
                      <p className="text-base font-poppins font-medium text-neutral-950 mb-1 leading-[24px]">
                        Aswan - Egypt
                      </p>
                      <p className="text-xs font-poppins font-normal text-[#717182] leading-[16px]">
                        Visit us at our location
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-[rgba(0,0,0,0.1)]" />

                  {/* Business Hours */}
                  <div className="flex gap-3 items-start">
                    <div className="bg-[rgba(3,2,19,0.1)] rounded-[10px] w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Image
                        src="/icons/contact-4.svg"
                        alt="Location"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-poppins font-normal text-[#717182] mb-1 leading-[20px]">
                        Business Hours
                      </p>
                      <p className="text-base font-poppins font-medium text-neutral-950 mb-1 leading-[24px]">
                        Monday - Friday
                      </p>
                      <p className="text-xs font-poppins font-normal text-[#717182] leading-[16px]">
                        8:00 AM - 8:00 PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Follow Us Card */}
              <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-6 shadow-sm">
                <h3 className="text-base font-poppins font-medium text-neutral-950 mb-2">
                  Follow Us
                </h3>
                <p className="text-base font-poppins font-normal text-[#717182] mb-4">
                  Stay connected on social media
                </p>
                <div className="flex gap-3">
                  <Link
                    href="https://www.facebook.com/profile.php?id=61578325940602"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src="/icons/cs-1.svg"
                      alt="Facebook"
                      width={16}
                      height={16}
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com/marakbi_app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src="/icons/cs-2.svg"
                      alt="Instagram"
                      width={16}
                      height={16}
                    />
                  </Link>
                  
                  <Link
                    href="https://www.x.com/marakbi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src="/icons/cs-3.svg"
                      alt="Twitter"
                      width={16}
                      height={16}
                    />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/marakbi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src="/icons/cs-4.svg"
                      alt="LinkedIn"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>

              {/* Need Immediate Help Card */}
              <div className="bg-[#030213] border border-[rgba(0,0,0,0.1)] rounded-[14px] p-6 shadow-sm">
                <h3 className="text-base font-poppins font-normal text-white mb-3">
                  Need Immediate Help?
                </h3>
                <p className="text-sm font-poppins font-normal text-white opacity-90 mb-4">
                  Call our support team for urgent assistance with your booking
                  or rental.
                </p>
                <Link
                  href="tel:+201031416900"
                  className="w-full bg-[#eceef2] h-9 rounded-lg flex items-center justify-center gap-2 hover:bg-[#d0d4da] transition-colors"
                >
                  <Image
                    src="/icons/contact-1.svg"
                    alt="Phone"
                    width={16}
                    height={16}
                    className="opacity-80"
                  />
                  <span className="text-sm font-poppins font-medium text-[#030213]">
                    Call Now
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
